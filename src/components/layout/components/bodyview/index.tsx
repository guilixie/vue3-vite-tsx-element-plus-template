import { defineComponent } from 'vue'
import BodyMainView from './components/Main'
import BodyNavlessView from './components/Navless'

export default defineComponent({
  name: 'BodyView',
  props: {
    isNavless: {
      type: Boolean,
      default: false
    }
  },
  render() {
    return this.isNavless ? <BodyNavlessView /> : <BodyMainView />
  }
})