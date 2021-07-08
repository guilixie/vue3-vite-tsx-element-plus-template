import { appUrlPrefix } from '@/router'
import { RouteRecordRaw } from 'vue-router'

export const resolveIndex: (routePaths: RouteRecordRaw[]) => string = (routePaths) => {
  // console.log(routePaths)
  const pathName = `/${appUrlPrefix}`
  const lastRoute = routePaths.slice(-1)[0]
  if (lastRoute?.path.startsWith(pathName)) {
    // 如果有redirect，说明重定向到儿子，来显示页面内容
    // 通常情况下，父亲会配置redirect，跳到默认的儿子
    // 当父亲只有一个儿子时，这么做可以菜单可以高亮这个儿子
    return (lastRoute.redirect as string) || lastRoute.path
  }
  const index = routePaths.reduce((res: string, route: RouteRecordRaw, index: number): string => {
    if(index === 0 && !route.path.startsWith(pathName)) {
      res += pathName
    }
    if(route.path.startsWith('/')) {
      res += route.path
    } else {
      res += `/${route.path}`
    }
    return res
  }, '')
  // console.log(index)
  return index
}

export const handleMenuRoutes: (routes: RouteRecordRaw[]) => RouteRecordRaw[] = (routes = []) => {
  if (!routes.length) return []
  return routes.reduce((acc: RouteRecordRaw[], route: RouteRecordRaw): RouteRecordRaw[] => {
    const childRoutes = route.children || []
    // 优先使用 hidden 配置，其次是一个孩子的话，如果这个孩子没有孩子，那么也不用显示，直接显示父级
    const isHidden = route.meta?.hidden ?? (childRoutes.length <= 1 && !childRoutes[0]?.children?.length)
    return isHidden ? acc : acc.concat({
      ...route,
      children: handleMenuRoutes(childRoutes)
    })
  }, [])
}