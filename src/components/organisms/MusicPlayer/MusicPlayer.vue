<template>
  <div class="music-player">
    <div class="music-player__header">
      <span>Music</span>
    </div>

    <PlayerControls @toggle-player="togglePlayer" :is-playing :volume />

    <audio ref="audioRef" :src />
  </div>
</template>

<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import PlayerControls from './PlayerControls/PlayerControls.vue'
import type { IMusicPlayerProps } from './MusicPlayer.types'

defineProps<IMusicPlayerProps>()

const isPlaying = ref<boolean>(false)
const volume = ref<number>(0)

const audioElement = useTemplateRef('audioRef')

const emit = defineEmits<{
  (e: 'pause'): void
  (e: 'play'): void
}>()

const pause = () => {
  if (!audioElement.value) return

  audioElement.value.pause()

  isPlaying.value = false

  emit('pause')
}

const play = async () => {
  if (!audioElement.value) return

  try {
    audioElement.value.play()

    isPlaying.value = true

    emit('play')
  } catch (error) {
    console.error('cant play', error)
  }
}

const togglePlayer = () => (isPlaying.value = !isPlaying.value)
</script>
