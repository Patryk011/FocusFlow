<template>
  <div class="app-layout">
    <Sidebar />
    <main class="main-content">
      <div class="router-container">
        <RouterView v-slot="{ Component, route }">
          <Transition name="fade">
            <component :is="Component" :key="route.path" />
          </Transition>
        </RouterView>
      </div>
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
    display: flex;
    flex-direction: column;
    flex: 1;

    .router-container {
      display: flex;
      flex: 1;
      flex-direction: column;

      :deep(> *) {
        flex: 1;
        min-height: 0;
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
