<template>
  <div class="home-view">
    <Button label="START" @click="onClick" />
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/atoms/Button/Button.vue'

const onClick = () => console.log('xxx')
</script>

<style lang="scss" scoped></style>
