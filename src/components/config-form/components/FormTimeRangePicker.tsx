import type { IData } from '@/app'
import { defineComponent } from 'vue'
import { defaultRangeSeparator, endPlaceholderMapping, startPlaceholderMapping } from '../services/defaultOptions'

const FormTimeRangePicker = defineComponent({
  name: 'FormTimeRangePicker',
  props: ['option', 'form'],
  setup: (props: Readonly<IData>) =>
    () => <el-time-picker
      is-range
      v-model={props.form[props.option.prop]}
      readonly={props.option.readonly}
      disabled={props.option.disabled}
      clearable={props.option.clearable}
      range-separator={props.option.rangeSeparator || defaultRangeSeparator}
      start-placeholder={props.option.startPlaceholder || startPlaceholderMapping[props.option.type]}
      end-placeholder={props.option.endPlaceholder || endPlaceholderMapping[props.option.type]}
      align="right"
    >
    </el-time-picker>
})

export default FormTimeRangePicker