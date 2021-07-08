import { defineComponent } from 'vue'
import styles from '../styles/index.module.scss'

export default defineComponent({
  name: 'CardTab',
  props: ['title', 'content', 'active'],
  render() {
    return <el-card class={`${styles.cardTab} ${this.active ? styles.cardTabActive : ''}`} shadow="hover">
      <h4 class={styles.cardTabTitle}>{this.title}</h4>
      <p class={styles.cardTabContent}>{this.content}</p>
    </el-card>
  }
})