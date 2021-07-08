import { defineComponent, PropType } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { resolveIndex } from '../services/utils'

export default defineComponent({
  name: 'MenuItem',
  props: {
    item: Object as PropType<RouteRecordRaw>,
    routePaths: Array as PropType<RouteRecordRaw[]>
  },
  render() {
    return <el-menu-item key={this.item.name} index={resolveIndex(this.routePaths)}>
      {this.item.meta?.title}
    </el-menu-item>
  }
})