import { defineComponent } from 'vue'
import styles from '../styles/index.module.scss'

export default defineComponent({
  name: 'BodyNavlessView',
  render() {
    return <el-container class={styles.appMainContainer}>
      <el-main class={`${styles.appContent} ${styles.appNavlessContent}`}>
        <el-scrollbar>
          <router-view />
        </el-scrollbar>
      </el-main>
    </el-container>
  }
})