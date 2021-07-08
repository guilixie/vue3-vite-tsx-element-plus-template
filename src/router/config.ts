import { IApplication } from '@/app'

// 获取配置的 appUrlPrefix
export const appUrlPrefix: string = import.meta.env.VITE_APP_URL_PREFIX as string

// 应用配置
export const appConfig: IApplication = {
  label: '某某管理平台',
  name: 'xxmanager',
  path: `/${appUrlPrefix}`,
  redirect: `/${appUrlPrefix}`,
  meta: {
    hidden: false
  }
}