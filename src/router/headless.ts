import type { Component } from 'vue'
import { NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import { menuRoutes } from './routes'
import { appUrlPrefix } from './config'

// 无头路由 layout
const HeadlessLayout: Component = () => import('components/layout/headless')

// 无头路由 path
export const headlessPrefix: string = import.meta.env.VITE_APP_HEADLESS_PREFIX as string

// 读取配置是否启用无头路由
export const headlessOpenFlag: boolean = import.meta.env.VITE_APP_HEADLESS_OPEN as string === '1'

const headlessPathName = `/${headlessPrefix}`

const handlePath = (path: string, pathName: string = headlessPathName): string => path.replace(`/${appUrlPrefix}`, pathName)

// 处理无头路由页面内部跳转，也跳转到无头路由的相应路径（一般在导航守卫beforeEach中使用）
export function handleHeadlessRedirect(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): boolean {
  // console.log(to, from)
  if (from.path.startsWith(headlessPathName) && !to.path.startsWith(headlessPathName)) {
    next({
      path: handlePath(to.path),
      query: to.query,
      params: to.params,
      replace: true
    })
    return true
  }
  return false
}

/**
 * 处理无头路由的自动生成
 * @param routes Array<RouteRecordRaw>
 */
export function handleHeadlessRoute(routes: Array<RouteRecordRaw>): Array<RouteRecordRaw> {
  const handleName = (name: string): string => `${headlessPrefix}-${name}`
  const doRun = (route: RouteRecordRaw, level = 0): RouteRecordRaw => {
    route = { ...route }
    if (route.path) {
      route.path =  handlePath(route.path)
    }
    if (route.name) {
      route.name = handleName(route.name as string)
    }
    if (route.component && level === 0) {
      route.component = HeadlessLayout
    }
    if (route.redirect) {
      route.redirect = handlePath(route.redirect as string)
    }
    if (route.children) {
      route.children = route.children.map((child: RouteRecordRaw): RouteRecordRaw => doRun(child, level + 1))
    }
    return route
  }
  return routes.reduce((acc: RouteRecordRaw[], route: RouteRecordRaw): RouteRecordRaw[] => {
    route = { ...route }
    if (!route.path.startsWith(headlessPathName)) {
      route = doRun(route)
      acc = acc.concat(route)
    }
    return acc
  }, [])
}

const headlessRoutes: Array<RouteRecordRaw> = headlessOpenFlag ? handleHeadlessRoute(menuRoutes) : []

export default headlessRoutes