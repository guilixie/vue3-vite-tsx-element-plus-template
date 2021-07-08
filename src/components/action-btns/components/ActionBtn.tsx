import { withModifiers } from 'vue'
import type { IBtnOption } from '@/app'
import { judgeVal } from '../services/utils'

const ActionBtn = (option: IBtnOption) =>
  <el-button
    key={option}
    type={option.type}
    icon={option.icon}
    v-show={!judgeVal(option.hide)}
    disabled={judgeVal(option.disabled)}
    onClick={withModifiers(() => option.cb?.(), ['stop'])}
  >
    {option.label}
  </el-button>

export default ActionBtn