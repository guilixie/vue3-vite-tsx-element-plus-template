import type { IData } from '@/app'
import { defineComponent } from 'vue'
import { placeholderMapping, defaultFormatMapping } from '../services/defaultOptions'

const FormDatePicker = defineComponent({
  name: 'FormDatePicker',
  props: ['option', 'form'],
  setup: (props: Readonly<IData>) =>
    () => <el-date-picker
      v-model={props.form[props.option.prop]}
      readonly={props.option.readonly}
      disabled={props.option.disabled}
      clearable={props.option.clearable}
      type={props.option.type}
      format={props.option.format || defaultFormatMapping[props.option.type]}
      placeholder={props.option.placeholder || placeholderMapping[props.option.type]}
    >
    </el-date-picker>
})

export default FormDatePicker