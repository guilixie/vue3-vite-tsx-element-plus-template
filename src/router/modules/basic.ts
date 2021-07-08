import type { Component } from 'vue'
import { RouteMeta } from 'vue-router'
import { appConfig, appUrlPrefix } from '../config'

// layout
const Layout: Component = () => import('components/layout')

// basic
const Manufacturer: Component = () => import('views/basic/manufacturer')
const AlgorithmType: Component = () => import('views/basic/algorithmtype')
const StreetInfo: Component = () => import('views/basic/streetinfo')
const Algorithm: Component = () => import('views/basic/algorithm')
const Resource: Component = () => import('views/basic/resource')

// 路由公共meta信息
const commonMeta: RouteMeta = appConfig.meta

export default [
  {
    path: `/${appUrlPrefix}/basic`,
    name: 'basic',
    meta: {
      ...commonMeta,
      title: '基础信息管理'
    },
    component: Layout,
    redirect: `/${appUrlPrefix}/basic/manufacturer`,
    children: [
      {
        path: 'manufacturer',
        name: 'manufacturer',
        component: Manufacturer,
        meta: {
          ...commonMeta,
          title: '厂商信息管理',
        }
      },
      {
        path: 'algorithmtype',
        name: 'algorithmtype',
        component: AlgorithmType,
        meta: {
          ...commonMeta,
          title: '算法类型管理'
        }
      },
      {
        path: 'streetinfo',
        name: 'streetinfo',
        component: StreetInfo,
        meta: {
          ...commonMeta,
          title: '街道信息管理'
        }
      },
      {
        path: 'algorithm',
        name: 'algorithm',
        component: Algorithm,
        meta: {
          ...commonMeta,
          title: '算法包管理'
        }
      },
      {
        path: 'resource',
        name: 'resource',
        component: Resource,
        meta: {
          ...commonMeta,
          title: '资源包管理'
        }
      }
    ]
  }
]