<template>
  <div class="tab-item" :class="{ active: isActive }">
    <button @click="handleClick" class="tab-item__button">{{ label }}</button>
  </div>
</template>

<script setup lang="ts">
import type { ITabItemEmits, ITabItemProps } from './TabItem.types'

const { label, tabKey, isActive } = defineProps<ITabItemProps>()

const emit = defineEmits<ITabItemEmits>()

const handleClick = (event: MouseEvent) => {
  emit('tab-click', tabKey, event)
}
</script>

<style lang="scss" scoped>
.tab-item {
  padding-block: 0.75rem;
  padding-inline: 1.5rem;

  &__button {
    position: relative;
    color: var(--color-text-muted);
    font-size: var(--fs-400);
    font-weight: var(--fw-medium);

    &::after {
      content: '';
      position: absolute;
      bottom: -1rem;
      left: 0;
      right: 0;
      height: 3px;
      background-color: var(--color-border-tertiary);
    }
  }

  &.active {
    color: var(--color-white);
  }
}
</style>
