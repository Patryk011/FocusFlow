<template>
  <div class="timer">
    <TimerBlock v-for="{ time, timeUnits } in timeBlocks" :time :time-units />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import TimerBlock from './TimerBlock/TimerBlock.vue'
import type { ITimeBlocks } from './Timer.types'

const currentSeconds = ref(0)

const timeBlocks = computed((): Array<ITimeBlocks> => {
  const hours = currentSeconds.value / 3600
  const minutes = (currentSeconds.value % 3600) / 60
  const seconds = currentSeconds.value % 60

  return [
    { time: hours.toString().padStart(2, '0'), timeUnits: 'Hours' },
    { time: minutes.toString().padStart(2, '0'), timeUnits: 'Minutes' },
    { time: seconds.toString().padStart(2, '0'), timeUnits: 'Seconds' },
  ]
})
</script>

<style lang="scss" scoped>
.timer {
  display: flex;
  gap: 2rem;
}
</style>
