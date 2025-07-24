export enum EButtonSizes {
  SMALL = 'small',
  MEDIUM = 'medium',
  BIG = 'big',
}

export enum EButtonVariants {
  PRIMARY = 'primary',
}

export interface IButtonProps {
  label: string
  onClick: () => void
  size?: EButtonSizes
  variant?: EButtonVariants
}
