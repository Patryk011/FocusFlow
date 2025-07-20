<template>
  <div class="tab-navigation">
    <TabItem
      v-for="{ label, key } in tabs"
      :key
      :label
      :tab-key="key"
      :is-active="activeTab === key"
      @tab-click="handleTabClick"
    />
  </div>
</template>

<script setup lang="ts">
import TabItem from './TabItem/TabItem.vue'
import type { ITabNavigationEmits, ITabNavigationProps } from './TabNavigation.types'

defineProps<ITabNavigationProps>()

const emit = defineEmits<ITabNavigationEmits>()

const handleTabClick = (tabKey: string, event: MouseEvent) => {
  emit('tab-change', tabKey, event)
  emit('update:activeTab', tabKey)
}
</script>

<style lang="scss" scoped>
.tab-navigation {
  width: 100%;
  display: flex;
  border-bottom: 2px solid var(--color-bg-tertiary);
}
</style>
