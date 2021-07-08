import { App } from 'vue'
import { createStore, Store } from 'vuex'

const store: Store<object> = createStore({
  // state () {
  //   return {

  //   }
  // },
  // mutations: {

  // }
})

export const useStore: (app: App) => void = (app: App) => {
  app.use(store)
}

export default store