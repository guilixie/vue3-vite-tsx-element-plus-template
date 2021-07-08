import { defineComponent, EmitsOptions, PropType, SetupContext, withModifiers } from 'vue'
import type { IData, IFormItem } from '@/app'
import { noop } from '@/utils'
import FormItem from '../config-form/components/FormItem'
import styles from './styles/index.module.scss'

export default defineComponent({
  name: 'SearchForm',
  props: {
    form: {
      type: Object as PropType<IData>,
      default: (): IData => ({})
    },
    options: {
      type: Array as PropType<IFormItem[]>,
      default: (): IFormItem[] => []
    },
    labelWidth: {
      type: String,
      default: '130px'
    }
  },
  emits: ['search', 'reset'],
  setup: (props: Readonly<IData>, context: SetupContext<EmitsOptions>) => {
    return () => (
      <el-form class={styles.searchForm} inline={true} label-width={props.labelWidth} model={props.form} onSubmit={withModifiers(noop, ['native', 'prevent'])}>
        {
          props.options.map((option: IFormItem) => <FormItem key={option.prop} option={option} form={props.form}></FormItem>)
        }
        <el-form-item class={styles.searchAction} label=" ">
          <el-button type="primary" onClick={() => context.emit('search')}>查询</el-button>
          <el-button onClick={() => context.emit('reset')}>重置</el-button>
        </el-form-item>
      </el-form>
    )
  }
})