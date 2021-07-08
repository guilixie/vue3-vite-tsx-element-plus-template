import type { IData } from '@/app'
import { defineComponent } from 'vue'
import { placeholderMapping } from '../services/defaultOptions'

const FormTimeSelect = defineComponent({
  name: 'FormTimeSelect',
  props: ['option', 'form'],
  setup: (props: Readonly<IData>) =>
    () => <el-time-select
      v-model={props.form[props.option.prop]}
      step={props.option.step}
      start={props.option.start}
      end={props.option.end}
      clearable={props.option.clearable}
      placeholder={props.option.placeholder || placeholderMapping[props.option.type]}
    >
    </el-time-select>
})

export default FormTimeSelect