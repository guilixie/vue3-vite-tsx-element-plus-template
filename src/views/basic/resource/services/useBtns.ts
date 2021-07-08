import type { IBtnOption, IData } from '@/app'
import useCRUD from '@/services/useCRUD'
import useDialogVisible from '@/services/useDialogVisible'
import useFormData from '@/services/useFormData'
import { isArrayEmpty, noimpl } from '@/utils'
import { Ref } from 'vue'

export default function (selected: Ref<IData[]>): IData {
  // 新增和修改表单数据相关
  const { formData, setAddFormData, setUpdateFormData } = useFormData()
  
  // 新增修改弹窗相关
  const { visible: addDialogVisible, setVisible: setAddDialogVisible } = useDialogVisible()

  // 新增修改删除
  const { add, update, del } = useCRUD({ 
    doDel, 
    setAddFormData, 
    setUpdateFormData, 
    setAddDialogVisible 
  })

  // 按钮配置
  const leftBtnOptions: IBtnOption[] = [{
    type: 'primary',
    label: '新增',
    cb: add
  },{
    type: 'danger',
    label: '删除',
    disabled: () => {
      return isArrayEmpty(selected.value)
    },
    cb: del
  }]

  // 删除
  function doDel (val: IData[] = selected.value): void {
    console.log('删除', val)
    noimpl()
  }

  return {
    leftBtnOptions,
    addDialogVisible,
    setAddDialogVisible,
    formData,
    update,
    del
  }
}