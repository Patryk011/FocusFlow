import type { ISize } from '@/globalTypes/global.types'

export interface IButtonProps {
  label: string
  onClick: () => void
  size?: ISize
}
