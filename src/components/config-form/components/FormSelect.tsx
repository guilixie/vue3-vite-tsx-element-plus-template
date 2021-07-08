import type { IData, ISelection } from '@/app'
import { defineComponent } from 'vue'

const FormSelect = defineComponent({
  name: 'FormSelect',
  props: ['option', 'form'],
  setup: (props: Readonly<IData>) =>
    () => <el-select
      v-model={props.form[props.option.prop]}
      disabled={props.option.disabled}
      clearable={props.option.clearable}
      multiple={props.option.multiple}
      filterable={props.option.filterable}
      allow-create={props.option.allowCreate}
      placeholder={props.option.placeholder}
    >
      {
        props.option.selections.map((selection: ISelection) => {
          return <el-option
            key={selection.value}
            label={selection.label}
            value={selection.value}
          ></el-option>
        })
      }
    </el-select>
})

export default FormSelect