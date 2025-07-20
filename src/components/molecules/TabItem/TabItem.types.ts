export interface ITabItemProps {
  label: string
  tabKey: string
  isActive?: boolean
}

export interface ITabItemEmits {
  'tab-click': [tabKey: string, event: MouseEvent]
}
