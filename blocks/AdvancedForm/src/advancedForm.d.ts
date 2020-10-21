export interface SelectItem {
  label: string
  value: string | number
  disabled?: boolean
  [propName: string]: any
}

export interface CascaderItem {
  label: string
  value: string | number | undefined
  children?: CascaderItem[]
}

export type VForm = Vue & {
  validate: (params?: any) => boolean
  validateField: (params?: any) => boolean
  resetFields: () => void
}
