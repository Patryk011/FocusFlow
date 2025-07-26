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
        <Icon
          :icon="volumeIcon"
          color="var(--color-white)"
          :size="24"
          @click="toggleVolume"
          class="volume-icon"
        />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          class="volume-slider"
          :value="volume"
          @input="handleVolumeChange"
        />

        <div class="volume-fill" :style="volumeFill" />

        <span class="player-controls__volume-value">{{ Math.round(volume * 100) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { EIconTypes } from '@/components/atoms/Icon/Icon.types'
import Icon from '@/components/atoms/Icon/Icon.vue'
import { computed, toValue } from 'vue'
import type { IPlayerControlsProps } from './PlayerControls.types'

const { volume, isPlaying } = defineProps<IPlayerControlsProps>()

const emit = defineEmits<{
  (e: 'togglePlayer'): void
  (e: 'volume-change', volume: number): void
  (e: 'toggle-volume'): void
}>()

const volumeFill = computed(() => ({
  width: `${volume * 100}%`,
}))

const volumeIcon = computed(() => (volume > 0 ? EIconTypes.VOLUME_ON : EIconTypes.VOLUME_OFF))

const togglePlayer = () => {
  emit('togglePlayer')
}

const handleVolumeChange = (event: Event) => {
  const target = event.target as HTMLInputElement

  const newVolume = parseFloat(target.value)

  emit('volume-change', newVolume)
}

const toggleVolume = () => {
  emit('toggle-volume')
}
</script>

<style lang="scss" scoped>
.player-controls {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  justify-content: center;
  align-items: center;

  &__play {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: var(--color-white);
    width: clamp(80px, 4.5vw, 250px);
    height: clamp(80px, 4.5vw, 250px);
  }

  &__volume-container {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    gap: 0.8rem;
  }

  .volume-slider {
    flex: 1;
    height: 6px;
    -webkit-appearance: none;
    appearance: none;
    background: var(--color-white);
    border-radius: 3px;
    cursor: pointer;
    z-index: 2;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 14px;
      height: 14px;
      background: var(--color-white);
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(52, 152, 219, 0.4);
    }

    &::-moz-range-thumb {
      width: 14px;
      height: 14px;
      background: var(--color-white);
      border-radius: 50%;
      cursor: pointer;
      border: none;
      box-shadow: 0 2px 8px rgba(52, 152, 219, 0.4);
    }
  }

  .volume-icon {
    cursor: pointer;
  }
}
</style>
