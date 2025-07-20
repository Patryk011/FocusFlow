<template>
  <button :class="['btn', `btn--${size}`, `btn--${variant}`]" @click="onClick">
    {{ label }}
  </button>
</template>

<script setup lang="ts">
import { EButtonSizes, EButtonVariants, type IButtonProps } from './Button.types'

withDefaults(defineProps<IButtonProps>(), {
  size: EButtonSizes.MEDIUM,
  variant: EButtonVariants.PRIMARY,
})
</script>

<style lang="scss" scoped>
@import '@assets/buttons.scss';

.btn {
  margin-top: 10%;
  &--primary {
    @include primary-button;
  }

  &--big {
    @include btn-big;
  }

  &--medium {
    @include btn-medium;
  }

  &--big {
    @include btn-big;
  }
}
</style>
