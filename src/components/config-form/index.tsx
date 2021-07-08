import { defineComponent, EmitsOptions, PropType, SetupContext, withModifiers } from 'vue'
import type { IData, IFormItem } from '@/app'
import { noop } from '@/utils'
import FormItem from '../config-form/components/FormItem'
import styles from './styles/index.module.scss'

export default defineComponent({
  name: 'ConfigForm',
  inheritAttrs: false,
  props: {
    form: {
      type: Object as PropType<IData>,
      default: (): IData => ({})
    },
    rules: {
      type: Object as PropType<IData>,
      default: (): IData => ({})
    },
    options: {
      type: Array as PropType<IFormItem[]>,
      default: (): IFormItem[] => []
    },
    labelWidth: {
      type: String,
      default: '120px'
    }
  },
  setup: (props: Readonly<IData>, ctx: SetupContext<EmitsOptions>) => {
    return () => (
      <el-form class={styles.configForm}
        label-width={props.labelWidth}
        model={props.form}
        rules={props.rules}
        {...ctx.attrs}
        onSubmit={withModifiers(noop, ['native', 'prevent'])}
      >
        {
          props.options.map((option: IFormItem) => <FormItem key={option.prop} option={option} form={props.form}></FormItem>)
        }
      </el-form>
    )
  }
})