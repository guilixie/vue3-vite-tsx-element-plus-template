import { defineComponent, h } from 'vue'
import type { IData } from '@/app'
import { typeCompMapping } from '../services/defaultOptions'
import styles from '../styles/index.module.scss'

const FormItem = defineComponent({
  name: 'FormItem',
  props: ['option', 'form'],
  setup: (props: Readonly<IData>) => {
    return () => <el-form-item
      label={props.option.label}
      prop={props.option.prop}
      style={props.option.style}
      class={props.option.class}
    >
      {
        props.option.suffix
          ? <div class={styles.formItemWrap}>
            {h(typeCompMapping[props.option.type], props)}
            {props.option.suffix(props)}
          </div>
          : h(typeCompMapping[props.option.type], props)
      }
    </el-form-item>
  }
})

export default FormItem