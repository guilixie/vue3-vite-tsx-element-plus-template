import { defineComponent } from 'vue'
import type { IData } from '@/app'
import ActionBtn from './components/ActionBtn'

const ActionBtns = defineComponent({
  name: 'ActionBtns',
  props: ['options', 'inline'],
  setup: (props: Readonly<IData>) => {
    return () => (
      <el-row class="action-btns" style={{ display: props.inline ? 'inline-block' : '' }}>
        {props.options.map(ActionBtn)}
      </el-row>
    )
  }
})

export default ActionBtns