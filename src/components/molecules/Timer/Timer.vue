<template>
  <TimerBlock />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import TimerBlock from './TimerBlock/TimerBlock.vue'
import type { ITimeBlocks } from './Timer.types'

const currentSeconds = ref(0)

const timeBlocks = computed((): Array<ITimeBlocks> => {
  const hours = currentSeconds.value / 3600
  const minutes = (currentSeconds.value % 3600) / 60
  const seconds = currentSeconds.value % 60
})
</script>
