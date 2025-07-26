<template>
  <div class="music-player">
    <div class="music-player__header">
      <span>Music</span>
    </div>

    <PlayerControls
      @toggle-player="togglePlayer"
      :is-playing
      :volume
      @volume-change="setVolume"
      @toggle-volume="toggleVolume"
    />

    <audio ref="audioRef" :src :loop preload="metadata" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, useTemplateRef } from 'vue'
import PlayerControls from './PlayerControls/PlayerControls.vue'
import type { IMusicPlayerProps } from './MusicPlayer.types'

defineProps<IMusicPlayerProps>()

const isPlaying = ref<boolean>(false)
const volume = ref<number>(1)

const audioElement = useTemplateRef('audioRef')

const emit = defineEmits<{
  (e: 'pause'): void
  (e: 'play'): void
  (e: 'volume-change', newVolume: number): void
}>()

const pause = () => {
  if (!audioElement.value) return

  audioElement.value.pause()

  isPlaying.value = false

  emit('pause')
}

const play = async (): Promise<void> => {
  if (!audioElement.value) return

  try {
    await audioElement.value.play()

    isPlaying.value = true

    emit('play')
  } catch (error) {
    console.error('cant play', error)
  }
}

const setVolume = (newVolume: number) => {
  if (!audioElement.value) return

  volume.value = newVolume

  audioElement.value.volume = newVolume

  emit('volume-change', newVolume)
}

const togglePlayer = () => {
  if (!audioElement.value) return

  isPlaying.value ? pause() : play()
}

const toggleVolume = () => {
  const newVolume = volume.value > 0 ? 0 : 1

  setVolume(newVolume)
}

onMounted(() => {
  if (audioElement.value) {
    audioElement.value.volume = volume.value
  }
})

onUnmounted(() => {
  if (audioElement.value) {
    audioElement.value.pause()
  }
})
</script>

<style lang="scss" scoped>
.music-player {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  &__header {
    font-size: var(--fs-600);
  }
}
</style>
