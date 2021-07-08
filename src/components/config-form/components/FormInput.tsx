import type { IData } from '@/app'
import { defineComponent } from 'vue'

const FormInput = defineComponent({
  name: 'FormInput',
  props: ['option', 'form'],
  setup: (props: Readonly<IData>) =>
    () => <el-input
      v-model={props.form[props.option.prop]}
      readonly={props.option.readonly}
      disabled={props.option.disabled}
      clearable={props.option.clearable}
      placeholder={props.option.placeholder}
    ></el-input>
})

export default FormInput