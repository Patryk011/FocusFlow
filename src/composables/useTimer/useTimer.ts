import { TIMER_MODES } from '@/components/molecules/Timer/Timer.consts'
import type { TimerMode } from '@/components/molecules/Timer/Timer.types'
import { ref } from 'vue'
import { STORAGE_KEY, type ITimerState } from './userTimer.types'

export function useTimer() {
  const currentTimeMode = ref<TimerMode | null>('Focus')
  const isRunning = ref<boolean>(false)
  const timeLeft = ref<number>(TIMER_MODES['Focus'] * 60)

  const sessionStartTime = ref<number | null>(null)
  const sessionDuration = ref<number>(0)

  const saveTimerState = () => {
    const state: ITimerState = {
      currentTimeMode: currentTimeMode.value,
      isRunning: isRunning.value,
      timeLeft: timeLeft.value,
      sessionStartTime: sessionStartTime.value,
      sesstionDuration: sessionDuration.value,
      lastSavedTime: Date.now(),
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch (err) {
      console.error('Error:', err)
    }
  }
}
