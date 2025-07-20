export interface ITabItem {
  label: string
  key: string
}

export interface ITabNavigationProps {
  tabs: Array<ITabItem>
  activeTab: string
}

export interface ITabNavigationEmits {
  'tab-change': [tabKey: string, event: MouseEvent]
  'update:activeTab': [tabKey: string]
}
