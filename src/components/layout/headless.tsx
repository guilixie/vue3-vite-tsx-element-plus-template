import { defineComponent } from 'vue'
import BodyView from './components/bodyview'
import styles from './styles/index.module.scss'

export default defineComponent({
  name: 'HeadlessLayout',
  render() {
    return <el-container class={styles.appContainer}>
      <BodyView is-navless />
    </el-container>
  }
})