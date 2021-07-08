import type { IData } from '@/app'
import { confirmDo } from '@/utils'

type CRUDProps = {
  doDel?: (x: IData[] | any) => Promise<void> | void,
  delMessage?: string,
  setAddFormData?: () => void,
  setUpdateFormData?: (x: IData) => void,
  setAddDialogVisible?: (x: boolean) => void
}

export default function useCRUD({
  doDel,
  delMessage = '此操作将永久删除所选记录, 是否继续?',
  setAddFormData,
  setUpdateFormData,
  setAddDialogVisible
}: CRUDProps) {

  // 新增
  function add(): void {
    setAddFormData?.()
    setAddDialogVisible?.(true)
  }

  // 修改
  function update({ row }: { row: IData }): void {
    setUpdateFormData?.(row)
    setAddDialogVisible?.(true)
  }

  // 删除
  function del(val: IData[]): void {
    confirmDo(delMessage, '已取消删除', () => doDel?.(val))
  }

  return {
    add,
    update,
    del
  }
}