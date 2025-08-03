<template>
  <div class="home-view">
    <TabNavigation
      :tabs
      :active-tab="currentTimeMode"
      @tab-change="handleTabChange"
      @update:active-tab="handleActivateTab"
      class="home-view__tab-nav"
    />

    <div class="home-view__content">
      <Timer class="home-view__timer" :time="formattedTime" :is-running />
      <Button :label :size="EButtonSizes.BIG" @click="toggleTimer" class="home-view__btn" />

      <MusicPlayer
        ref="musicPlayer"
        :src="studySrc"
        :loop="true"
        @play="onMusicPlay"
        @pause="onMusicPause"
        class="home-view__music-player"
      />
    </div>
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

import { computed, onMounted, onUnmounted, ref, useTemplateRef, watch } from 'vue'
import bellSrc from '@assets/audio/bell.wav'
import studySrc from '@assets/audio/study.mp3'
import { useDocumentVisibility } from '@vueuse/core'
import MusicPlayer from '@/components/organisms/MusicPlayer/MusicPlayer.vue'
import { useTimer } from '@/composables/useTimer/useTimer'

const documentVisibility = useDocumentVisibility()

const {
  currentTimeMode,
  isRunning,
  timeLeft,
  sessionStartTime,
  sessionDuration,
  saveTimerState,
  resetTimer,
} = useTimer()

const musicPlayerRef = useTemplateRef('musicPlayer')
const audioSound = new Audio(bellSrc)
const isMusicPlaying = ref<boolean>(false)
const timerIntervalId = ref<ReturnType<typeof setInterval> | null>(null)

const tabs: ITabItem[] = [
  { key: 'Focus', label: 'Focus' },
  { key: 'Short Break', label: 'Short Break' },
  { key: 'Long Break', label: 'Long Break' },
]

const label = computed(() => (isRunning.value ? 'STOP' : 'START'))

const onMusicPlay = () => (isMusicPlaying.value = true)

const onMusicPause = () => (isMusicPlaying.value = false)

const formattedTime = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60)
  const seconds = timeLeft.value % 60

  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})

const updateTimeFromTimestamp = () => {
  if (!sessionStartTime.value || !isRunning.value) return

  const now = Date.now()
  const elapsedSeconds = Math.floor((now - sessionStartTime.value) / 1000)
  const newTimeLeft = Math.max(0, sessionDuration.value - elapsedSeconds)

  timeLeft.value = newTimeLeft

  if (newTimeLeft === 0) {
    stopTimerInterval()
    completeSession()
  }
}

const stopTimerInterval = () => {
  if (timerIntervalId.value) {
    clearInterval(timerIntervalId.value)
    timerIntervalId.value = null
  }
  isRunning.value = false
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

  sessionStartTime.value = Date.now()

  sessionDuration.value = timeLeft.value

  timerIntervalId.value = setInterval(() => {
    isRunning.value = true

    if (documentVisibility.value !== 'visible') {
      updateTimeFromTimestamp()
      return
    }

    if (timeLeft.value > 0) {
      timeLeft.value--
      return
    }

    if (timeLeft.value === 0) {
      stopTimerInterval()
      completeSession()
    }
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

  if (isRunning.value) startTimerInterval()
})

onUnmounted(() => {
  if (timerIntervalId.value) {
    clearInterval(timerIntervalId.value)
  }
})

watch(documentVisibility, (isVisible) => {
  if (isVisible && isRunning.value) {
    updateTimeFromTimestamp()
  }
})
</script>

<style lang="scss" scoped>
.home-view {
  display: flex;
  flex-direction: column;
  width: 100%;

  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6rem;
    padding-right: 15%;
    padding-bottom: 2%;
  }

  &__timer {
    width: 100%;
    max-width: 500px;
  }

  &__btn {
    margin-bottom: 5rem;
  }

  &__music-player {
  }
}
</style>
