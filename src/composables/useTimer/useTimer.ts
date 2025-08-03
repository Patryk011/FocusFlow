import { TIMER_MODES } from '@/components/molecules/Timer/Timer.consts'
import type { TimerMode } from '@/components/molecules/Timer/Timer.types'
import { onMounted, ref, watch } from 'vue'
import { MAX_PAUSE_TIME, STORAGE_KEY, type ITimerState } from './useTimer.types'
import { useEventListener } from '@vueuse/core'

export function useTimer() {
  const currentTimeMode = ref<TimerMode | null>('Focus')
  const isRunning = ref<boolean>(false)
  const timeLeft = ref<number>(TIMER_MODES['Focus'] * 60)
  const sessionStartTime = ref<number | null>(null)
  const sessionDuration = ref<number>(0)

  const saveTimerState = () => {
    const state: ITimerState = {
      currentTimeMode: currentTimeMode.value,
      timeLeft: timeLeft.value,
      isRunning: isRunning.value,
      sessionStartTime: sessionStartTime.value,
      sessionDuration: sessionDuration.value,
      lastSavedTime: Date.now(),
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
      console.log('Timer state saved', state)
    } catch (err) {
      console.error(`Error during saving state ${err}`)
    }
  }

  const loadTimerState = () => {
    try {
      const savedState = localStorage.getItem(STORAGE_KEY)

      if (!savedState) return false

      const state: ITimerState = JSON.parse(savedState)

      currentTimeMode.value = state.currentTimeMode
      timeLeft.value = state.timeLeft
      isRunning.value = state.isRunning
      sessionStartTime.value = state.sessionStartTime
      sessionDuration.value = state.sessionDuration

      const now = Date.now()

      if (state.lastSavedTime && state.sessionStartTime) {
        const timeSinceLastSave = now - state.lastSavedTime

        if (state.isRunning && timeSinceLastSave > MAX_PAUSE_TIME) {
          const sessionElapsed = Math.floor((now - state.sessionStartTime) / 1000)
          const newTimeLeft = Math.max(0, state.sessionDuration - sessionElapsed)

          if (newTimeLeft === 0) return 'completed'

          timeLeft.value = newTimeLeft

          return true
        }
      }
    } catch (err) {
      console.error('Failed to load timer state from localStorage:', err)
      return false
    }
  }

  const clearTimerState = () => {
    try {
      localStorage.removeItem(STORAGE_KEY)
      console.log('🗑️ Timer state cleared')
    } catch (error) {
      console.error('Failed to clear timer state:', error)
    }
  }

  const resetTimer = () => {
    if (!currentTimeMode.value) return
    timeLeft.value = TIMER_MODES[currentTimeMode.value] * 60
    sessionStartTime.value = null
    sessionDuration.value = 0
    isRunning.value = false
  }

  watch([currentTimeMode, isRunning], () => {
    saveTimerState()
  })

  const handleBeforeUnload = () => {
    saveTimerState()
  }

  onMounted(() => {
    const loadResult = loadTimerState()

    if (loadResult === 'completed') {
      currentTimeMode.value = currentTimeMode.value === 'Focus' ? 'Long Break' : 'Focus'
    }

    useEventListener('beforeunload', handleBeforeUnload)
  })

  return {
    currentTimeMode,
    isRunning,
    timeLeft,
    sessionStartTime,
    sessionDuration,

    saveTimerState,
    loadTimerState,
    clearTimerState,
    resetTimer,
  }
}
