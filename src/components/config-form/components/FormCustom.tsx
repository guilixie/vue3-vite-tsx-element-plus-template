import type { IData } from '@/app'
import { defineComponent, getCurrentInstance } from 'vue'

const FormCustom = defineComponent({
  name: 'FormCustom',
  props: ['option', 'form'],
  setup: (props: Readonly<IData>) => {
    const internalInstance = getCurrentInstance()
    return props.option.render.bind(internalInstance)
  }
})

export default FormCustom