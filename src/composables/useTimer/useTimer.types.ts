import type { TimerMode } from '@/components/molecules/Timer/Timer.types'

export const STORAGE_KEY = 'timerState'

export const MAX_PAUSE_TIME = 5 * 60 * 1000

export interface ITimerState {
  currentTimeMode: TimerMode | null
  timeLeft: number
  isRunning: boolean
  sessionStartTime: number | null
  sessionDuration: number
  lastSavedTime: number | null
}
