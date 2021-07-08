import type { Component } from 'vue'
import { RouteMeta } from 'vue-router'
import { appConfig, appUrlPrefix } from '../config'

// layout
const Layout: Component = () => import('components/layout')

// components
const Manufacturer: Component = () => import('views/basic/manufacturer')

// 路由公共meta信息
const commonMeta: RouteMeta = appConfig.meta

export default []