import { RouteLocationNormalizedLoaded, RouteRecordRaw, useRoute } from 'vue-router'
import { menuRoutes } from '@/router'
import type { IData } from '@/app'
import { handleMenuRoutes } from './utils'

export default function (): IData {
  const route: RouteLocationNormalizedLoaded = useRoute()
  // console.log('useMenus: ', route)

  const activeNav: string = route.matched.slice(-1)[0].path

  const menus: RouteRecordRaw[] = handleMenuRoutes(menuRoutes)

  return {
    menus,
    activeNav
  }
}