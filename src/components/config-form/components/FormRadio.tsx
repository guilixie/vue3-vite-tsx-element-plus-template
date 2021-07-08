import type { IData, ISelection } from '@/app'
import { defineComponent } from 'vue'

const FormRadio = defineComponent({
  name: 'FormRadio',
  props: ['option', 'form'],
  setup: (props: Readonly<IData>) =>
    () => <el-radio-group v-model={props.form[props.option.prop]}>
      {
        props.option.selections.map((selection: ISelection) => {
          return <el-radio
            key={selection.value}
            label={selection.value}
          >
            {selection.label}
          </el-radio>
        })
      }
    </el-radio-group>
})

export default FormRadio