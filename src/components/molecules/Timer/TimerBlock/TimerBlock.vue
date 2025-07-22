<template>
  <div class="timer-wrapper">
    <div class="time-block">
      <span class="time-block__text">{{ time }}</span>
    </div>
    <span class="time-units-text"> {{ timeUnits }} </span>
  </div>
</template>

<script setup lang="ts">
import type { ITimerBlockProps } from './TimerBlock.types'

defineProps<ITimerBlockProps>()
</script>

<style lang="scss" scoped>
.timer-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  .time-block {
    padding-inline: 14rem;
    padding-block: 1.4rem;
    border-radius: 0.4rem;
    background-color: var(--color-bg-secondary);

    &__text {
      font-weight: var(--fw-medium);
      font-size: var(--fs-500);
      letter-spacing: 1px;
    }
  }

  & > .time-units-text {
    font-size: var(--fs-500);
  }
}
</style>
