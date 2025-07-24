<template>
  <div class="home-view">
    <TabNavigation
      :tabs
      :active-tab="currentTimeMode"
      @tab-change="handleTabChange"
      @update:active-tab="handleActivateTab"
      class="home-view__tab-nav"
    />
    <Timer class="home-view__timer" :time="formattedTime" :is-running />
    <Button :label :size="EButtonSizes.BIG" @click="toggleTimer" class="home-view__btn" />
  </div>
</template>

<script setup lang="ts">
import { EButtonSizes } from '@/components/atoms/Button/Button.types'
import Button from '@/components/atoms/Button/Button.vue'
import type { ITabItem } from '@/components/molecules/TabNavigation/TabNavigation.types'
import TabNavigation from '@/components/molecules/TabNavigation/TabNavigation.vue'
import { TIMER_MODES } from '@/components/molecules/Timer/Timer.consts'
import type { TimerMode } from '@/components/molecules/Timer/Timer.types'
import Timer from '@/components/molecules/Timer/Timer.vue'

import { computed, onMounted, onUnmounted, ref } from 'vue'
import bellSrc from '@assets/audio/bell.wav'

const audioSound = new Audio(bellSrc)

const currentTimeMode = ref<TimerMode | null>('Focus')
const isRunning = ref<boolean>(false)
const timeLeft = ref<number>(TIMER_MODES['Focus'] * 60)
const timerIntervalId = ref<ReturnType<typeof setInterval> | null>(null)

const label = computed(() => (isRunning.value ? 'STOP' : 'START'))

const tabs: ITabItem[] = [
  { key: 'Focus', label: 'Focus' },
  { key: 'Short Break', label: 'Short Break' },
  { key: 'Long Break', label: 'Long Break' },
]

const formattedTime = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60)
  const seconds = timeLeft.value % 60

  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})

const stopTimerInterval = () => {
  if (timerIntervalId.value) {
    clearInterval(timerIntervalId.value)
    timerIntervalId.value = null
  }
  isRunning.value = false
}

const resetTimer = () => {
  if (!currentTimeMode.value) return

  timeLeft.value = TIMER_MODES[currentTimeMode.value] * 60
}

const toggleTimer = () => {
  if (isRunning.value) {
    stopTimerInterval()
    return
  }
  startTimerInterval()
}

const playNotification = () => {
  if (audioSound) {
    audioSound.currentTime = 0

    audioSound.play().catch((e) => {
      console.warn('Could not play notification sound:', e)
    })
  }

  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('Pomodoro Timer', {
      body: `${currentTimeMode.value} session completed!`,
      icon: '/favicon.ico',
    })
  }
}

const completeSession = () => {
  playNotification()

  currentTimeMode.value = currentTimeMode.value === 'Focus' ? 'Long Break' : 'Focus'

  resetTimer()
  startTimerInterval()
}

const startTimerInterval = () => {
  if (timerIntervalId.value) return

  timerIntervalId.value = setInterval(() => {
    isRunning.value = true

    if (timeLeft.value > 0) {
      timeLeft.value--
      return
    }

    stopTimerInterval()
    completeSession()
  }, 1000)
}

const handleTabChange = (tabKey: string, event: MouseEvent) => {
  if (isRunning.value) {
    stopTimerInterval()
  }

  currentTimeMode.value = tabKey as TimerMode
  resetTimer()
}

const handleActivateTab = (tabKey: string) => {
  currentTimeMode.value = tabKey as TimerMode
}

onMounted(() => {
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission()
  }
})

onUnmounted(() => {
  if (timerIntervalId.value) {
    clearInterval(timerIntervalId.value)
  }
})
</script>

<style lang="scss" scoped>
.home-view {
  position: relative;
  min-height: 100vh;

  &__timer {
    padding-top: 3%;
    padding-right: 15%;
  }

  &__btn {
    position: absolute;
    top: 32%;
    left: 30%;
  }
}
</style>
