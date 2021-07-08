import { App } from 'vue'
import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized, Router } from 'vue-router'
import headlessRoutes, { headlessPrefix, headlessOpenFlag, handleHeadlessRedirect, handleHeadlessRoute } from './headless'
import routes, { menuRoutes } from './routes'
import { appConfig, appUrlPrefix } from './config'

const router: Router = createRouter({
  history: createWebHistory(),
  routes: [
    ...routes,
    ...headlessRoutes
  ]
})

const whiteList: string[] = ['/login', '/404']
router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  // 处理无头路由页面内部跳转，也跳转到无头路由的相应路径
  if (headlessOpenFlag && ![...whiteList, '', '/'].includes(to.path)) {
    const isRedirect = handleHeadlessRedirect(to, from, next)
    if (isRedirect) return
  }
  next()
})

export const useRouter: (app: App) => void = (app: App): void => {
  app.use(router)
}

export {
  menuRoutes,
  appConfig,
  appUrlPrefix,
  headlessPrefix,
  headlessOpenFlag,
  handleHeadlessRedirect,
  handleHeadlessRoute
}

export default router