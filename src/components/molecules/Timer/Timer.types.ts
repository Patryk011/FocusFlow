import type { TIMER_MODES } from './Timer.consts'

export type TimerMode = keyof typeof TIMER_MODES

export interface ITimerProps {
  time: string
  isRunning: boolean
}
