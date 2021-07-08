import type { IData } from '@/app'
import { defineComponent } from 'vue'
import { defaultRangeSeparator, endPlaceholderMapping, startPlaceholderMapping } from '../services/defaultOptions'
import FormTimeSelect from './FormTimeSelect'

const FormTimeRangeSelect = defineComponent({
  name: 'FormTimeRangeSelect',
  props: ['option', 'form'],
  setup: (props: Readonly<IData>) => {
    const startProps = {
      ...props,
      option: {
        ...props.option,
        placeholder: props.option.startPlaceholder || startPlaceholderMapping[props.option.type]
      }
    }
    const endProps = {
      ...props,
      option: {
        ...props.option,
        placeholder: props.option.endPlaceholder || endPlaceholderMapping[props.option.type]
      }
    }
    return () => <>
      <FormTimeSelect {...startProps}></FormTimeSelect>
      <span class="el-range-separator">{props.option.rangeSeparator || defaultRangeSeparator}</span>
      <FormTimeSelect {...endProps}></FormTimeSelect>
    </>
  }
})

export default FormTimeRangeSelect