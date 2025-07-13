export enum EButtonSizes {
  SMALL = 'small',
  MEDIUM = 'medium',
  BIG = 'big',
}

export interface IButtonProps {
  label: string
  onClick: () => void
  size?: EButtonSizes
}
