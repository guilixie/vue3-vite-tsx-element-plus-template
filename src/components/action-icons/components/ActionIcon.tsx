import { withModifiers } from 'vue'
import type { IBtnOption } from '@/app'
import styles from '../styles/index.module.scss'
import { judgeVal } from '@/components/action-btns/services/utils'

const ActionIcon = (option: IBtnOption) =>
  <el-link
    class={styles.actionIcon}
    key={option}
    type={option.type || 'primary'}
    v-show={!judgeVal(option.hide)}
    disabled={judgeVal(option.disabled)}
    underline={option.underline || false}
    onClick={withModifiers(() => option.cb?.(), ['stop', 'prevent'])}
  >
    <i class={option.icon}></i> {option.label}
  </el-link>

export default ActionIcon