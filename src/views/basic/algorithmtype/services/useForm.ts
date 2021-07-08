import { reactive, ref, Ref } from 'vue'
import { EFormItemType, IData, IFormItem } from '@/app'
import useForm from '@/services/useForm'
import { noop } from '@/utils'

export default function (): IData {
  // 表单配置
  const options: IFormItem[] = [{
    type: EFormItemType.INPUT,
    prop: 'type',
    label: '算法类型',
    placeholder: '请输入算法类型'
  }]

  // 生成默认表单数据
  const formFactory = () => ({
    type: ''
  })

  const { form, resetForm } = useForm(formFactory)

  // 搜索
  const search: Ref<() => void> = ref(noop)

  function setSearch(doSearch: () => void): void {
    search.value = doSearch
  }

  // 重置
  const reset = () => {
    resetForm()
    search.value()
  }

  return {
    form,
    options,
    search,
    reset,
    setSearch
  }
}