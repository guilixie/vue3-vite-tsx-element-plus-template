import { EFormItemType, IData, IFormItem } from '@/app'
import useForm from '@/services/useForm'
import { noimpl } from '@/utils'
import { watch } from 'vue'

export default function (props: Readonly<IData>) {
  // 生成默认表单数据
  const formFactory = () => ({
    name: '',
    type: [],
    account: '',
    password: ''
  })

  const { form, mergeForm, resetForm } = useForm(formFactory)

  // 验证规则
  const rules = {
    name: [
      { required: true, message: '请输入厂商名称', trigger: 'change' }
    ],
    type: [
      { required: true, trigger: 'change', validator: validateType }
    ]
  }

  function validateType (rule: any, value: any, cb: (x?: any) => void) {
    if (!value.length) {
      cb(new Error('请选择类别'));
    } else {
      cb()
    }
  }

  // 表单配置
  const options: IFormItem[] = [{
    type: EFormItemType.INPUT,
    prop: 'name',
    label: '厂商名称',
    placeholder: '请输入厂商名称'
  },{
    type: EFormItemType.CHECKBOX,
    prop: 'type',
    label: '类别',
    selections: [{
      value: '1',
      label: '监控厂商'
    },{
      value: '2',
      label: '算法厂商'
    }]
  },{
    type: EFormItemType.INPUT,
    prop: 'account',
    label: '会话帐号',
    placeholder: '请输入会话帐号'
  },{
    type: EFormItemType.INPUT,
    prop: 'password',
    label: '密码',
    placeholder: '请输入密码'
  }]

  const getTitle = () => props.isUpdate ? '修改厂商信息' : '新增厂商信息'

  const confirm = () => {
    console.log('保存', form)
    noimpl()
  }


  watch(() => props.visible, (newVal, oldVal) => {
    if (newVal && !oldVal) {
      // 判断是修改还是新增
      if(props.isUpdate) {
        mergeForm(props.formData, (form: IData, key: string, val: any) => {
          if(key === 'type') {
            console.log('自定义处理表单数据：', form, key, val)
            form[key] = val.split(',')
            return false
          }
          return true
        })
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