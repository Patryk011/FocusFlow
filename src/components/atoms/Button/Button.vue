<template>
  <button class="btn-action" @click="onClick">
    {{ label }}
  </button>
</template>

<script setup lang="ts">
import { type IButtonProps } from './Button.types'

defineProps<IButtonProps>()
</script>

<style lang="scss" scoped></style>
