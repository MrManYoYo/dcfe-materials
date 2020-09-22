export interface StateItem {
  key: string
  value: string | number
  [propName: string]: any
}

export interface ThreatItem {
  label: string
  value: string | number | undefined
  children?: threatItem[]
}

export type VForm = Vue & {
  validate: (params?: any) => boolean
  validateField: (params?: any) => boolean
  resetFields: () => void
}
