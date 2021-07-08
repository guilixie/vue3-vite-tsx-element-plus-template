import { reactive } from 'vue'
import type { IData } from '@/app'

export default function useFormData() {
  // 编辑表单数据
  const formData: {
    data: IData | null,
    isUpdate: boolean
  } = reactive({
    data: null,
    isUpdate: false
  })

  const setData = (data: IData | null) => {
    formData.data = data
  }

  const setIsUpdate = (data: boolean) => {
    formData.isUpdate = data
  }

  const setAddFormData = () => {
    formData.isUpdate = false
    formData.data = null
  }

  const setUpdateFormData = (data: IData) => {
    formData.isUpdate = true
    formData.data = data
  }

  return {
    formData,
    setData,
    setIsUpdate,
    setAddFormData,
    setUpdateFormData
  }
}