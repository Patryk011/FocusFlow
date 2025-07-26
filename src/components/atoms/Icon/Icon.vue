<template>
  <div :class="['icon-wrapper', { hoverColor }]" v-html="iconSvgContent" :style />
</template>

<script setup lang="ts">
import { computed, type CSSProperties, onMounted, ref, watch } from 'vue'
import { type IIconProps } from './Icon.types'

const { icon, color, hoverColor, size } = defineProps<IIconProps>()

const iconSvgContent = ref<string>('')

const loadIcon = async () => {
  try {
    const svgContent = await fetch(`/icons/${icon}.svg`)

    iconSvgContent.value = await svgContent.text()
  } catch (error) {
    console.error(`Problem with loading icon ${error}`)
    iconSvgContent.value = ''
  }
}

onMounted(async () => {
  await loadIcon()
})

const style = computed<CSSProperties>(() => ({
  '--fill': color,
  ...(hoverColor && { '--hover-color': hoverColor }),
  ...(size && { width: `${size}px`, height: `${size}px` }),
}))

watch(
  () => icon,
  async (newIcon, oldIcon) => {
    if (newIcon !== oldIcon && newIcon) loadIcon()
  },
)
</script>

<style lang="scss" scoped>
.icon-wrapper {
  --fill: black;

  :deep(svg) {
    fill: var(--fill);
    width: inherit;
    height: inherit;
    transition:
      fill 0.1s ease-in,
      stroke 0.1s ease-in;
  }
}
</style>
