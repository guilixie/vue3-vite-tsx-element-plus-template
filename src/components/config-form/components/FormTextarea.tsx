import type { IData } from '@/app'
import { defineComponent } from 'vue'

const FormTextarea = defineComponent({
  name: 'FormTextarea',
  props: ['option', 'form'],
  setup: (props: Readonly<IData>) =>
    () => <el-input
      type="textarea"
      rows={props.option.rows}
      v-model={props.form[props.option.prop]}
      readonly={props.option.readonly}
      disabled={props.option.disabled}
      clearable={props.option.clearable}
      placeholder={props.option.placeholder}
    ></el-input>
})

export default FormTextarea