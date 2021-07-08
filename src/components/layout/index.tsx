import { defineComponent } from 'vue'
import Headbar from './components/headbar'
import BodyView from './components/bodyview'
import styles from './styles/index.module.scss'

export default defineComponent({
  name: 'Layout',
  render() {
    return <el-container class={styles.appContainer}>
      <el-header class={styles.appHeader}>
        <Headbar />
      </el-header>
      <el-container class={styles.appBody}>
        <BodyView />
      </el-container>
    </el-container>
  }
})