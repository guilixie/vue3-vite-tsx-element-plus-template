import type { IData } from '@/app'
import { defineComponent, EmitsOptions, PropType, SetupContext } from 'vue'

export default defineComponent({
  name: 'TransferButtons',
  props: {
    buttonTexts: {
      type: Array as PropType<string[]>,
      default: (): string[] => []
    },
    buttonDisableds: {
      type: Array as PropType<boolean[]>,
      default: (): boolean[] => []
    }
  },
  emits: ['transferLeft', 'transferRight'],
  setup: (props: Readonly<IData>, ctx: SetupContext<EmitsOptions>) => {
    return () => <>
      <el-button type="primary" class=" el-transfer__button is-with-texts" disabled={props.buttonDisableds[0]} onClick={() => ctx.emit('transferLeft')}>
        <i class="el-icon-arrow-left"></i><span>{props.buttonTexts[0]}</span>
      </el-button>
      <el-button type="primary" class=" el-transfer__button is-with-texts" disabled={props.buttonDisableds[1]} onClick={() => ctx.emit('transferRight')}>
        <span>{props.buttonTexts[1]}</span><i class="el-icon-arrow-right"></i>
      </el-button>
    </>
  }
})