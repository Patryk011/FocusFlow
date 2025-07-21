<template>
  <div class="timer-wrapper">
    <div class="time-block">
      <span>{{ time }}</span>
    </div>
    <span> {{ timeUnits }} </span>
  </div>
</template>

<script setup lang="ts">
import type { ITimerBlockProps } from './TimerBlock.types'

defineProps<ITimerBlockProps>()
</script>

<style lang="scss" scoped>
.timer-wrapper {
}
</style>
