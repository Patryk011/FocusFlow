<template>
  <div class="app-layout">
    <Sidebar />
    <main class="main-content">
      <RouterView v-slot="{ Component, route }">
        <Transition name="fade">
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </main>
  </div>
</template>
<script setup lang="ts">
import Sidebar from './components/organisms/Sidebar/Sidebar.vue'
</script>
<style lang="scss" scoped>
.app-layout {
  display: flex;
  min-height: 100vh;

  .main-content {
    padding: 1.75rem;
    flex: 1;
  }
}
</style>
