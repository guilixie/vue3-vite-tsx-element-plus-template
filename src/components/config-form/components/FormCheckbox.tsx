import type { IData, ISelection } from '@/app'
import { defineComponent } from 'vue'

const FormCheckbox = defineComponent({
  name: 'FormCheckbox',
  props: ['option', 'form'],
  setup: (props: Readonly<IData>) =>
    () => <el-checkbox-group v-model={props.form[props.option.prop]}>
      {
        props.option.selections.map((selection: ISelection) => {
          return <el-checkbox
            key={selection.value}
            label={selection.value}
          >
            {selection.label}
          </el-checkbox>
        })
      }
    </el-checkbox-group>
})

export default FormCheckbox