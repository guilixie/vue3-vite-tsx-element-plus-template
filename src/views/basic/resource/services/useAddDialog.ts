import type { IData } from '@/app'
import useForm from '@/services/useForm'
import { noimpl } from '@/utils'
import { watch } from 'vue'

export default function (props: Readonly<IData>) {
  // 生成默认表单数据
  const formFactory = () => ({
    id: '',
    name: '',
    streets: [],
    algorithms: []
  })

  const { form, mergeForm, resetForm } = useForm(formFactory)

  const getTitle = () => props.isUpdate ? '修改资源包' : '新增资源包'

  const confirm = () => {
    console.log('保存', form)
    noimpl()
  }

  watch(() => props.visible, (newVal, oldVal) => {
    if (newVal && !oldVal) {
      // 判断是修改还是新增
      if(props.isUpdate) {
        mergeForm(props.formData, (form, key, val) => {
          // 自定义处理，将表格数据转换成表单数据
          if(key === 'name') return true
          console.log(form, key, val)
        })
      } else {
        resetForm()
      }
    }
  })

  return {
    form,
    confirm,
    getTitle
  }
}