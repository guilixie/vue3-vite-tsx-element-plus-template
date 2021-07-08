import { defineComponent, PropType } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { resolveIndex } from '../services/utils'
import Menu from './Menu'

export default defineComponent({
  name: 'SubMenu',
  props: {
    item: Object as PropType<RouteRecordRaw>,
    routePaths: Array as PropType<RouteRecordRaw[]>
  },
  render() {
    const slots = {
      title: () => <span>{this.item.meta?.title}</span>,
      default: () => {
        return this.item.children?.map((it: RouteRecordRaw) => {
          return <Menu item={it} routePaths={[...this.routePaths, it]} />
        })
      }
    }
    return <el-submenu key={this.item.name} index={resolveIndex(this.routePaths)}>
      {slots}
    </el-submenu>
  }
})
