import { defineComponent } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import Menu from './components/Menu'
import useMenus from './services/useMenus'
import styles from './styles/index.module.scss'

export default defineComponent({
  name: 'Navbar',

  setup: () => {
    const { menus, activeNav } = useMenus()

    return () => <el-menu class={styles.appNavContainer} router={true} default-active={activeNav}>
      <el-scrollbar>
        {
          menus.map((item: RouteRecordRaw) => <Menu item={item} routePaths={[item]} />)
        }
      </el-scrollbar>
    </el-menu>
  }
})