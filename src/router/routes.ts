import { Component } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { appUrlPrefix } from './config'
import { basicRoutes, componentsRoutes } from './modules'

// components
const Error401: Component = () => import('components/error/401')
const Error404: Component = () => import('components/error/404')

// 作为菜单显示的路由信息
export const menuRoutes: Array<RouteRecordRaw> = [
  ...basicRoutes,
  ...componentsRoutes
]

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: `/${appUrlPrefix}`
  },
  {
    path: `/${appUrlPrefix}`,
    redirect:  `/${appUrlPrefix}/basic`
  },
  ...menuRoutes,
  {
    path: '/401',
    name: '401',
    component: Error401
  },
  {
    path: '/404',
    name: '404',
    component: Error404
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]

// console.log(routes)

export default routes