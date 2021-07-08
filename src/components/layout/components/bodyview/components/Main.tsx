import { defineComponent } from 'vue'
import Navbar from '../../navbar'
import styles from '../styles/index.module.scss'

export default defineComponent({
  name: 'BodyMainView',
  render() {
    return <el-container class={styles.appMainContainer}>
      <el-aside class={styles.appNav}>
        <Navbar />
      </el-aside>
      <el-main class={styles.appContent}>
        <el-scrollbar>
          <router-view />
        </el-scrollbar>
      </el-main>
    </el-container>
  }
})