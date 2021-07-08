import type { IData } from '@/app'
import { defineComponent } from 'vue'
import { placeholderMapping } from '../services/defaultOptions'

const FormTimePicker = defineComponent({
  name: 'FormTimePicker',
  props: ['option', 'form'],
  setup: (props: Readonly<IData>) =>
    () => <el-time-picker
      v-model={props.form[props.option.prop]}
      readonly={props.option.readonly}
      disabled={props.option.disabled}
      clearable={props.option.clearable}
      placeholder={props.option.placeholder || placeholderMapping[props.option.type]}
    >
    </el-time-picker>
})

export default FormTimePicker