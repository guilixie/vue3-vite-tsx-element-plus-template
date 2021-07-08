import { Component } from 'vue'
import type { RouteMeta } from 'vue-router'

export declare interface IApplication {
  label: string,
  name: string,
  redirect: string,
  path: string,
  meta: RouteMeta
}

export declare interface IBodyView {
  key: string,
  url: string,
  isIframe: boolean,
  component: string,
  activated: boolean
}

export const enum EFormItemType {
  CUSTOM = 'custom',
  INPUT = 'input',
  TEXTAREA = 'textarea',
  INPUTNUMBER = 'inputnumber',
  RADIO = 'radio',
  CHECKBOX = 'checkbox',
  SELECT = 'select',
  DATE = 'date',
  DATES = 'dates',
  YEAR = 'year',
  MONTH = 'month',
  WEEK = 'week',
  TIME = 'time',
  TIMESELECT = 'timeselect',
  DATETIME = 'datetime',
  DATERANGE = 'daterange',
  MONTHRANGE = 'monthrange',
  DATETIMERANGE = 'datetimerange',
  TIMERANGE = 'timerange',
  TIMESELECTRANGE = 'timeselectrange',
}

export declare interface ISelection {
  label: string,
  value: string | number | boolean
}

export declare interface IFormItem {
  type: EFormItemType,
  prop: string,
  label?: string,
  placeholder?: string,
  rangeSeparator?: string,
  startPlaceholder?: string,
  endPlaceholder?: string,
  render?: JSX.Element | void, // 搭配type为CUSTOM
  selections?: ISelection[] | any[],
  suffix?: JSX.Element,
  style?: string | IData,
  class?: string,
  step?: string | number,
  start?: string,
  end?: string,
  min?: number,
  max?: number,
  format?: string,
  readonly?: boolean,
  disabled?: boolean,
  multiple?: boolean,
  filterable?: boolean,
  allowCreate?: boolean,
  clearable?: boolean,
  rows?: number
}

export declare interface IBtnOption {
  type?: string,
  label?: string,
  underline?: boolean,
  icon?: string,
  key?: string,
  cb?: (x?: any) => void | Promise<void>,
  hide?: boolean | ((x?: any) => boolean),
  disabled?: boolean | ((x?: any) => boolean)
}

export declare interface ITableCol {
  prop: string,
  label: string,
  width?: string,
  fixed?: boolean | string,
  sortable?: boolean | string,
  resizable?: boolean,
  renderHeader?: ({ column, $index }: { column: IData, $index: number }) => any,
  slotHeader?: ({ column, $index }: { column: IData, $index: number }) => any,
  formatter?: (row: IData, column: IData, cellValue: any, index: number) => any
}

export declare interface ITableAction {
  type: string,
  label: string,
  key?: string,
  cb?: (x?: any) => void | Promise<void>,
  hide?: boolean | ((x?: any) => boolean),
  disabled?: boolean | ((x?: any) => boolean)
}

export declare interface IPager {
  total: number,
  pageSize: number,
  currentPage: number
}

export declare interface IData {
  [key: string]: any
}

export const enum SortOrders {
  ASC = 'ascending',
  DESC = 'descending'
}

export declare interface ISort {
  order: SortOrders | null,
  column?: IData | null,
  prop: String | null
}

export declare interface ITab {
  label: string,
  name: string,
  disabled?: boolean,
  closable?: boolean,
  lazy?: boolean,
  component?: Component
}