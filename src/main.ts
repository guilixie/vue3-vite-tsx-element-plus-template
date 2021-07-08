import { createApp } from 'vue'
import { useRouter } from './router'
// import { useStore } from './store'
import { useElementPlus } from './plugins'
import App from './Application'
import './styles/index.scss'

export const app = createApp(App)

useRouter(app)
// useStore(app)
useElementPlus(app)

app.mount('#app')
