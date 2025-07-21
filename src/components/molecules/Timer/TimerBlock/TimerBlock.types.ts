export type TTimeUnits = 'seconds' | 'hours' | 'minutes'

export interface ITimerBlockProps {
  time: string
  timeUnits: TTimeUnits
}
