<template>
  <div class="home-view">
    <TabNavigation :tabs :active-tab="currentTimeMode" />
    <Button label="START" :size="EButtonSizes.BIG" @click="onClick" />
  </div>
</template>

<script setup lang="ts">
import { EButtonSizes } from '@/components/atoms/Button/Button.types'
import Button from '@/components/atoms/Button/Button.vue'
import type { ITabItem } from '@/components/molecules/TabNavigation/TabNavigation.types'
import TabNavigation from '@/components/molecules/TabNavigation/TabNavigation.vue'
import { ref } from 'vue'

const onClick = () => console.log('xxx')

const currentTimeMode = ref<string>('Focus')

const tabs: ITabItem[] = [
  { key: 'Focus', label: 'Focus' },

  { key: 'Short Break', label: 'Short Break' },
  { key: 'Long Break', label: 'Long Break' },
]
</script>

<style lang="scss" scoped></style>
