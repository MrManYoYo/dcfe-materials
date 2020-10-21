export interface ItemForm {
  code: string
  name: string
}

export interface ListItem extends ItemForm {
  id: number
  parentId: number
  children?: ListItem[]
  add?: boolean
  [propName: string]: any
}

export type VForm = Vue & {
  validate: (params?: any) => boolean
  validateField: (params?: any) => boolean
  resetFields: () => void
}
