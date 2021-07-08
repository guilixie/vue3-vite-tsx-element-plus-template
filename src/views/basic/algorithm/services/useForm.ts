import { EFormItemType, IData, IFormItem } from '@/app'
import useForm from '@/services/useForm'
import { noop } from '@/utils'
import { Ref, ref } from 'vue'

export default function (): IData {
  // 表单配置
  const options: IFormItem[] = [{
    type: EFormItemType.INPUT,
    prop: 'id',
    label: '算法包ID',
    placeholder: '请输入算法包ID'
  }, {
    type: EFormItemType.INPUT,
    prop: 'name',
    label: '算法包名称',
    placeholder: '请输入算法包名称'
  }, {
    type: EFormItemType.SELECT,
    prop: 'manufacturer',
    label: '厂商',
    placeholder: '全部',
    selections: []
  }, {
    type: EFormItemType.INPUT,
    prop: 'type',
    label: '算法类型',
    placeholder: '请输入算法类型'
  }, {
    type: EFormItemType.SELECT,
    prop: 'identifyType',
    label: '识别方式',
    placeholder: '全部',
    selections: []
  }]

  // 生成默认表单数据
  const formFactory = () => ({
    id: '',
    name: '',
    manufacturer: '',
    type: '',
    identifyType: ''
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