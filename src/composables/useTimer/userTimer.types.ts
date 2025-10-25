import type { TimerMode } from '@/components/molecules/Timer/Timer.types'

export const STORAGE_KEY = 'pomodoro-timer-state'

export interface ITimerState {
  currentTimeMode: TimerMode | null
  timeLeft: number
  isRunning: boolean
  sessionStartTime: number | null
  sesstionDuration: number
  lastSavedTime: number
}
