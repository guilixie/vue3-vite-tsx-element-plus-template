import { EFormItemType, IFormItem } from '@/app'
import { defineComponent, inject, reactive } from 'vue'
import ConfigForm from '@/components/config-form'
import styles from '../../styles/AddDialog.module.scss'

export default defineComponent({
  name: 'ResInfo',
  setup: () => {
    const options: IFormItem[] = [
      {
        type: EFormItemType.INPUT,
        prop: 'name',
        label: '资源包名称',
        placeholder: '请输入资源包名称'
      }
    ]

    const rules = {
      name: [{ required: true, message: '必需项', trigger: 'change' }]
    }

    const form = inject('form', reactive({ name: '' }))

    return () => <ConfigForm 
      class={styles.resInfoForm}
      options={options} 
      form={form} 
      rules={rules}
    ></ConfigForm>
  }
})