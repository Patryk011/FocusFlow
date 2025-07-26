import type { ISize } from '@/globalTypes/global.types'

export enum EIconTypes {
  HOME = 'Home',
  PLAY = 'Play',
  STOP = 'Stop',
  VOLUME_OFF = 'Volume_off',
  VOLUME_ON = 'Volume_on',
}

export interface IIconProps {
  icon: EIconTypes
  color?: string
  size?: number
  hoverColor?: string
}
