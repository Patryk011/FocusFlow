<template>
  <aside class="sidebar">
    <div class="sidebar__header">
      <span>Focus flow</span>
    </div>

    <nav class="sidebar__nav">
      <SidebarLink to="/" label="Home" :icon="EIconTypes.HOME" />
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { EIconTypes } from '@/components/atoms/Icon/Icon.types'
import SidebarLink from './SidebarLink/SidebarLink.vue'
</script>

<style lang="scss" scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding-inline: 1.5rem;
  padding-block: 2rem;
  min-width: 350px;

  &__header {
    padding-inline-start: 1rem;
  }
}
</style>
