<template>
  <router-link :to :class="['sidebar-link', { active: isActive }]">
    <Icon :icon :size="24" color="var(--color-inverse)" />
    <span>{{ label }}</span>
  </router-link>
</template>

<script setup lang="ts">
import Icon from '@/components/atoms/Icon/Icon.vue'
import { type ISidebarLinkProps } from './SidebarLink.types'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const { to } = defineProps<ISidebarLinkProps>()

const route = useRoute()

const isActive = computed(() => route.path === to)
</script>

<style lang="scss" scoped>
.sidebar-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-inline: 1rem;
  padding-block: 0.75rem;

  &.active {
    background-color: var(--color-primary);
  }
}
</style>
