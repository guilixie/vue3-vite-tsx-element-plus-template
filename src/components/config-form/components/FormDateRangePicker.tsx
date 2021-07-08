import type { IData } from '@/app'
import { defineComponent } from 'vue'
import { defaultFormatMapping, defaultRangeSeparator, endPlaceholderMapping, startPlaceholderMapping } from '../services/defaultOptions'

const FormDateRangePicker = defineComponent({
  name: 'FormDateRangePicker',
  props: ['option', 'form'],
  setup: (props: Readonly<IData>) =>
    () => <el-date-picker
      v-model={props.form[props.option.prop]}
      type={props.option.type}
      readonly={props.option.readonly}
      disabled={props.option.disabled}
      clearable={props.option.clearable}
      format={props.option.format || defaultFormatMapping[props.option.type]}
      range-separator={props.option.rangeSeparator || defaultRangeSeparator}
      start-placeholder={props.option.startPlaceholder || startPlaceholderMapping[props.option.type]}
      end-placeholder={props.option.endPlaceholder || endPlaceholderMapping[props.option.type]}
    >
    </el-date-picker>
})

export default FormDateRangePicker