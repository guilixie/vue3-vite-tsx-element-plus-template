import { defineComponent, PropType } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import MenuItem from './MenuItem'
import SubMenu from './SubMenu'

export default defineComponent({
  name: 'Menu',
  props: {
    item: Object as PropType<RouteRecordRaw>,
    routePaths: Array as PropType<RouteRecordRaw[]>
  },
  render() {
    return this.item.children?.length
      ? <SubMenu item={this.item} routePaths={this.routePaths} />
      : <MenuItem item={this.item} routePaths={this.routePaths} />
  }
})
