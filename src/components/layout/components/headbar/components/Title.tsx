import { defineComponent } from 'vue'
import styles from '../styles/Title.module.scss'

export default defineComponent({
  name: 'Title',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  render() {
    return <div class="app-title-container">
      <div class={styles.appTitle}>{this.title}</div>
    </div>
  }
})