import { defineComponent } from 'vue'
import type { IBtnOption, IData } from '@/app'
import ActionIcon from './components/ActionIcon'
import styles from './styles/index.module.scss'

const ActionIcons = defineComponent({
  name: 'ActionIcons',
  props: ['options'],
  setup: (props: Readonly<IData>) => {
    return () => (
      <el-row class={styles.actionIconContainer}>
        {
          props.options.reduce((acc: JSX.Element[], option: IBtnOption) => {
            return (!option || option.hide) ? acc : acc.concat(ActionIcon(option))
          }, [])
        }
      </el-row>
    )
  }
})

export default ActionIcons