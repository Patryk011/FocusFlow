import type { ISize } from '@/globalTypes/global.types'

export enum EIconTypes {
  HOME = 'Home',
  PLAY = 'Play',
  STOP = 'Stop',
}

export interface IIconProps {
  icon: EIconTypes
  color?: string
  size?: number
  hoverColor?: string
}
