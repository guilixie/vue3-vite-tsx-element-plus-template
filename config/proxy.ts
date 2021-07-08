import envConfig from './env'

export default {
  [envConfig.apiPrefix]: {
    target: envConfig.apiOrigin,
    changeOrigin: true,
    rewrite: (path) => {
      const reg = new RegExp(`^${envConfig.apiPrefix.replace(/\//g, '\\/')}`)
      return path.replace(reg, '')
    }
  }
}