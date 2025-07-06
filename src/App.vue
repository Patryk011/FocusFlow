<template>
  <RouterView v-slot="{ Component, route }">
    <Transition name="fade">
      <component :is="Component" :key="route.path" />
    </Transition>
  </RouterView>
</template>
