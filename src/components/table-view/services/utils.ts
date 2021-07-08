import type { IData, IPager } from '@/app'
import { isFunction, isUndef } from '@/utils'

export const getIndex: (index: number, pager: IPager) => number
  = (index, pager) => (pager.currentPage - 1) * pager.pageSize + index + 1

export const judgeVal: (
  val: boolean | ((x: IData) => boolean) | any,
  { row }: { row: IData },
  defaultVal?: boolean
) => boolean = (val, { row }, defaultVal = false) => isUndef(val) ? defaultVal : isFunction(val) ? val(row) : val