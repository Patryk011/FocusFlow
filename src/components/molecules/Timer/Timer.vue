<template>
  <div class="timer-wrapper">
    <div class="time-block">
      <span class="time-block__text">{{ time }}</span>
    </div>
    <span class="time-text">Time</span>
  </div>
</template>

<script setup lang="ts">
import type { ITimerProps } from './Timer.types'

defineProps<ITimerProps>()
</script>

<style lang="scss" scoped>
.timer-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  & .time-block {
    padding-inline: 10rem;
    padding-block: 2rem;
    border-radius: 0.4rem;
    background-color: var(--color-bg-secondary);

    &__text {
      font-weight: var(--fw-medium);
      font-size: var(--fs-700);
      letter-spacing: 1px;
    }
  }

  & > .time-text {
    font-size: var(--fs-600);
  }
}
</style>
