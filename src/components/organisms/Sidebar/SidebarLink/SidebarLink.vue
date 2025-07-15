<template>
  <router-link :to>
    <Icon :icon :size="24" color="var(--color-inverse)" />
    <span>{{ label }}</span>
  </router-link>
</template>

<script setup lang="ts">
import Icon from '@/components/atoms/Icon/Icon.vue'
import { type ISidebarLinkProps } from './SidebarLink.types'

defineProps<ISidebarLinkProps>()
</script>
