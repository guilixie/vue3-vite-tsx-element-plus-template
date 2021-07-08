import { defineComponent } from 'vue'
import styles from '../styles/Breadcrumb.module.scss'
import BreadcrumbItem from './BreadcrumbItem'

export default defineComponent({
  props: ['breadcrumbs'],
  render() {
    return <el-breadcrumb class={styles.appBreadcrumbContainer} separator="/">
      {this.breadcrumbs.map(BreadcrumbItem)}
    </el-breadcrumb>
  }
})