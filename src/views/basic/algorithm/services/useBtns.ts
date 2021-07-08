import type { IBtnOption, IData } from '@/app'
import useCRUD from '@/services/useCRUD'
import useDialogVisible from '@/services/useDialogVisible'
import useFormData from '@/services/useFormData'
import useStartOrStop from '@/services/useStartOrStop'
import { isArrayEmpty, noimpl } from '@/utils'
import { STATUS_ENUM } from '@/utils/constant'
import { computed, Ref } from 'vue'

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

  // 启用停用
  const { start, stop } = useStartOrStop({
    doStart,
    doStop
  })

  // 过滤出启用的
  const filterEnabled = (arr: IData[]) => {
    return arr.filter((val: IData) => val.status === STATUS_ENUM['启用'])
  }
  // 过滤出停用的
  const filterDisabled = (arr: IData[]) => {
    return arr.filter((val: IData) => val.status === STATUS_ENUM['停用'])
  }
  // 启用的已选
  const enableSelected = computed(() => {
    return filterEnabled(selected.value)
  })
  // 停用的已选
  const disableSelected = computed(() => {
    return filterDisabled(selected.value)
  })

  // 按钮配置
  const leftBtnOptions: IBtnOption[] = [{
    type: 'primary',
    label: '新增',
    cb: add
  }, {
    type: 'danger',
    label: '删除',
    disabled: () => {
      return isArrayEmpty(selected.value)
    },
    cb: del
  }, {
    type: 'success',
    label: '启用',
    disabled: () => {
      return isArrayEmpty(selected.value) || isArrayEmpty(disableSelected.value)
    },
    cb: start
  }, {
    type: 'info',
    label: '停用',
    disabled: () => {
      return isArrayEmpty(selected.value) || isArrayEmpty(enableSelected.value)
    },
    cb: stop
  }]

  // 删除
  function doDel(val: IData[] = selected.value): void {
    console.log('删除', val)
    // TODO: 需要调用API的
    noimpl()
  }
  // 启用
  function doStart(val: IData[] = selected.value): void {
    const data = filterDisabled(val)
    console.log('启用', data)
    // TODO: 先模拟下，需要调用API的
    data.forEach((d) => d.status = STATUS_ENUM['启用'])
  }
  // 停用
  function doStop(val: IData[] = selected.value): void {
    const data = filterEnabled(val)
    console.log('停用', data)
    // TODO: 先模拟下，需要调用API的
    data.forEach((d) => d.status = STATUS_ENUM['停用'])
  }

  return {
    leftBtnOptions,
    addDialogVisible,
    setAddDialogVisible,
    formData,
    update,
    del,
    start,
    stop
  }
}