export interface DropdownItem {
  type?: 'link' | 'divider' | 'SPA'
  icon?: string
  text?: string
  url?: string
  value?: string
}

export interface OptionItem {
  text: string
  value: number | string | null
  disabled?: boolean
}

interface IconItem {
  text?: string
  icon?: string
}

export type TabItem = IconItem | string | number

export type SelectValueType = string | number | null

export interface SelectItem {
  text: string
  value: SelectValueType
  disabled?: boolean
  children?: SelectItem[]
  _selected?: boolean
}

export interface Pagination {
  index: number
  pageSize: number
}

export interface Column {
  title?: string
  prop?: string
  sortable?: boolean
  cssClass?: string
  formatter?: 'thousands' | 'numberToBoolean' | (<T>(x: T) => T)
}

export type MenuMode = 'SPA' | 'link' | 'nonLink'

export interface Menu {
  title?: string
  icon?: string
  url?: string
  mode?: MenuMode
  children?: Menu[]
  _focus?: boolean
  _height?: number
}

export interface StepItem {
  text?: string
  icon?: string
}

export interface DialogProps {
  modelValue?: boolean
  title?: string
  body?: string
  okText?: string
  cancelText?: string
  noFooter?: boolean
  simple?: boolean
  fixed?: boolean
  visible?: boolean
  class?: string
  confirm?: () => unknown
}

export type ToastType = 'info' | 'success' | 'error' | 'warn'

export interface ToastProps {
  text: string
  showClose?: boolean
  duration?: number
  type: ToastType
}
