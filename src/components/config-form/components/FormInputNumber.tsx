import type { IData } from '@/app'
import { defineComponent } from 'vue'

const FormInputNumber = defineComponent({
  name: 'FormInputNumber',
  props: ['option', 'form'],
  setup: (props: Readonly<IData>) =>
    () => <el-input-number
      v-model={props.form[props.option.prop]}
      controls-position="right"
      step-strictly
      disabled={props.option.disabled}
      placeholder={props.option.placeholder}
      min={props.option.min}
      max={props.option.max}
      step={props.option.step}
    ></el-input-number>
})

export default FormInputNumber