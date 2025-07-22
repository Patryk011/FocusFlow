<template>
  <div class="home-view">
    <TabNavigation :tabs :active-tab="currentTimeMode" class="home-view__tab-nav" />
    <Timer class="home-view__timer" />
    <Button label="START" :size="EButtonSizes.BIG" @click="onClick" class="home-view__btn" />
  </div>
</template>

<script setup lang="ts">
import { EButtonSizes } from '@/components/atoms/Button/Button.types'
import Button from '@/components/atoms/Button/Button.vue'
import type { ITabItem } from '@/components/molecules/TabNavigation/TabNavigation.types'
import TabNavigation from '@/components/molecules/TabNavigation/TabNavigation.vue'
import Timer from '@/components/molecules/Timer/Timer.vue'
import { ref } from 'vue'

const onClick = () => console.log('xxx')

const currentTimeMode = ref<string>('Focus')

const tabs: ITabItem[] = [
  { key: 'Focus', label: 'Focus' },

  { key: 'Short Break', label: 'Short Break' },
  { key: 'Long Break', label: 'Long Break' },
]
</script>

<style lang="scss" scoped>
.home-view {
  position: relative;
  min-height: 100vh;

  &__timer {
    padding-top: 2rem;
  }

  &__btn {
    position: absolute;
    top: 30%;
    left: 36%;
  }
}
</style>
