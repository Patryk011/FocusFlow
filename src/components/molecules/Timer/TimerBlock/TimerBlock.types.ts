export type TTimeUnits = 'Seconds' | 'Hours' | 'Minutes'

export interface ITimerBlockProps {
  time: string
  timeUnits: TTimeUnits
}
