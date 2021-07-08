import { EFormItemType, IData, IFormItem } from '@/app'
import useForm from '@/services/useForm'
import { noimpl } from '@/utils'
import { watch } from 'vue'

export default function (props: Readonly<IData>) {
  // 生成默认表单数据
  const formFactory = () => ({
    id: '',
    name: '',
    type: ''
  })

  const { form, mergeForm, resetForm } = useForm(formFactory)

  // 验证规则
  const rules = {
    name: [
      { required: true, trigger: 'change', validator: validateName }
    ],
    type: [
      { required: true, trigger: 'change', validator: validateType }
    ]
  }

  function validateName(rule: any, value: any, cb: (x?: any) => void) {
    cb()
  }
  function validateType(rule: any, value: any, cb: (x?: any) => void) {
    // if (!value.length) {
    //   cb(new Error('请选择类别'));
    // } else {
    //   cb()
    // }
    cb()
  }

  // 表单配置
  const options: IFormItem[] = [{
    type: EFormItemType.INPUT,
    prop: 'id',
    label: '类型ID',
    readonly: true
  }, {
    type: EFormItemType.INPUT,
    prop: 'type',
    label: '算法类型',
    placeholder: '请输入算法类型'
  }, {
    type: EFormItemType.INPUT,
    prop: 'name',
    label: '英文名称',
    placeholder: '请输入英文名称'
  }]

  const getTitle = () => props.isUpdate ? '修改算法类型' : '新增算法类型'

  const confirm = () => {
    console.log('保存', form)
    noimpl()
  }

  watch(() => props.visible, (newVal, oldVal) => {
    if (newVal && !oldVal) {
      // 判断是修改还是新增
      if (props.isUpdate) {
        mergeForm(props.formData)
      } else {
        resetForm()
      }
    }
  })

  return {
    form,
    rules,
    options,
    confirm,
    getTitle
  }
}