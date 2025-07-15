<template>
  <div class="home-view">
    <Button label="START" :size="EButtonSizes.BIG" @click="onClick" />
  </div>
</template>

<script setup lang="ts">
import { EButtonSizes } from '@/components/atoms/Button/Button.types'
import Button from '@/components/atoms/Button/Button.vue'

const onClick = () => console.log('xxx')
</script>

<style lang="scss" scoped></style>
