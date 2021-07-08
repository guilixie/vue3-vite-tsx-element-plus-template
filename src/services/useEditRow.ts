import type { IData } from '@/app'
import { isDef, isUndef } from '@/utils'

export default function (): IData {
  const editKey = '_is_edit'
  const oldKey = '_old_'

  function isEdit(row: IData) {
    return row[editKey]
  }

  function isNotEdit(row: IData) {
    return !isEdit(row)
  }

  function setEdit(row: IData, isEdit: boolean) {
    row[editKey] = isEdit
  }

  function editRow(row: IData, column: IData, newVal: any, oldVal: any) {
    // 只保存编辑前最初的值
    if (isUndef(row[`${oldKey}${column.property}`])) {
      row[`${oldKey}${column.property}`] = oldVal
    }
    row[column.property] = newVal
  }

  function enterEdit({ row }: { row: IData }) {
    setEdit(row, true)
  }

  function exitEdit({ row }: { row: IData }) {
    setEdit(row, false)
  }

  function saveEdit({ row, column }: { row: IData, column: IData }, cb: (x: IData, y: IData) => Promise<void> | void) {
    exitEdit({ row })
    cb?.(row, column)
  }

  function cancelEdit({ row }: { row: IData }) {
    exitEdit({ row })
    resetRow(row)
  }

  function resetRow(row: IData) {
    Object.keys(row).forEach((key) => {
      // 如果是老的值，才做重置操作
      if (key.startsWith(oldKey)) {
        const property = key.replace(oldKey, '')
        if (isDef(row[`${oldKey}${property}`])) {
          row[property] = row[`${oldKey}${property}`]
        }
      }
    })
  }

  return {
    isEdit,
    isNotEdit,
    setEdit,
    editRow,
    enterEdit,
    exitEdit,
    saveEdit,
    cancelEdit,
    resetRow
  }
}