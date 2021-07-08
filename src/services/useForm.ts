import { reactive } from 'vue'
import type { IData } from '@/app'

// 表单公共处理逻辑
export default function useForm(formFactory: () => IData) {
  // 表单数据
  const form = reactive(formFactory())

  // 合并修改的数据
  const mergeForm = (data: IData, customHandler?: (form: IData, key: string, val: any) => void) => {
    Object.keys(form).forEach((key: string) => {
      // 自定义处理，将表格数据转换成表单数据
      if (customHandler) {
        const isContinue: any = customHandler(form, key, Reflect.get(data, key))
        // 自定义处理无返回值或者返回false，则不执行后续操作
        if (!isContinue) return
      }
      // 当没有customHandler或者customHandler返回true,则走默认处理
      Reflect.set(form, key, Reflect.get(data, key))
    })
  }

  // 重置表单数据
  const resetForm = () => {
    mergeForm(formFactory())
  }

  return {
    form,
    mergeForm,
    resetForm
  }
}