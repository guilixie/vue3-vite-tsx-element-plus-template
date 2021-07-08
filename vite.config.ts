import { CSSModulesOptions, defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import styleImport from 'vite-plugin-style-import'
import { visualizer } from 'rollup-plugin-visualizer'
import { impConfig, proxyConfig, aliasConfig, cssModulesConfig, cssPreprocessorConfig } from './config'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: proxyConfig
  },
  build: {
    sourcemap: false
  },
  resolve: {
    alias: aliasConfig,
    extensions: ['.ts', '.js', '.tsx', '.jsx', '.json', '.d.ts']
  },
  css: {
    modules: cssModulesConfig as CSSModulesOptions,
    preprocessorOptions: cssPreprocessorConfig
  },
  plugins: [
    vueJsx(),
    styleImport(impConfig),
    visualizer()
  ]
})
