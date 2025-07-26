<template>
  <div class="player-controls">
    <button @click="togglePlayer" class="player-controls__play">
      <Icon
        :icon="isPlaying ? EIconTypes.STOP : EIconTypes.PLAY"
        color="var(--color-bg-primary)"
        :size="32"
      />
    </button>

    <div class="player-controls__volume">
      <div class="player-controls__volume-container">
        <input type="range" min="0" max="1" step="0.01" v-model="volume" class="volume-slider" />
        <div class="volume-fill" :style="volumeFill" />

        <span class="player-controls__volume-value">{{ Math.round(volume * 100) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { EIconTypes } from '@/components/atoms/Icon/Icon.types'
import Icon from '@/components/atoms/Icon/Icon.vue'
import { computed } from 'vue'
import type { IPlayerControlsProps } from './PlayerControls.types'

const { volume, isPlaying } = defineProps<IPlayerControlsProps>()

const emit = defineEmits<{
  (e: 'togglePlayer'): void
  (e: 'volumeChange', volume: number): void
}>()

const volumeFill = computed(() => ({
  width: `${volume * 100}%`,
}))

const togglePlayer = () => {
  emit('togglePlayer')
}

const handleVolumeChange = (event: Event) => {
  const target = event.target as HTMLInputElement

  const newVolume = parseFloat(target.value)

  emit('volumeChange', newVolume)
}
</script>

<style lang="scss" scoped>
.player-controls {
  &__play {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: var(--color-white);
    width: clamp(80px, 5vw, 250px);
    height: clamp(80px, 5vw, 250px);
  }
}
</style>
