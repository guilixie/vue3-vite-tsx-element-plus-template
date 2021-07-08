export default {
  libs: [{
    libraryName: 'element-plus',
    esModule: true,
    ensureStyleFile: true,
    resolveStyle: (name) => {
      return `element-plus/lib/theme-chalk/src/${name}.css`
    },
    resolveComponent: (name) => {
      return `element-plus/lib/${name}`
    }
  }]
}