import type { IData } from '@/app'
import { isDef } from '@/utils'
import { defineComponent, EmitsOptions, PropType, SetupContext, withModifiers } from 'vue'
import CardTab from './components/CardTab'
import styles from './styles/index.module.scss'

declare interface ITab {
  title: string,
  key?: string | number,
  content?: string
}

export default defineComponent({
  name: 'CardTabs',
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    data: {
      type: Array as PropType<ITab[]>,
      default: (): ITab[] => []
    }
  },
  emits: ['update:modelValue'],
  setup: (props: Readonly<IData>, ctx: SetupContext<EmitsOptions>) => {

    const handleClick = (tab: ITab): void => {
      ctx.emit('update:modelValue', isDef(tab.key) ? tab.key : tab.title)
    }

    const judgeActive = (tab: ITab): boolean => {
      if (isDef(tab.key)) {
        return tab.key === props.modelValue
      }
      return tab.title === props.modelValue
    }

    return () => <div class={styles.cardTabs}>
      {
        props.data.map((item: ITab) => {
          return <CardTab
            title={item.title}
            content={item.content}
            key={item.key || item.title}
            active={judgeActive(item)}
            onClick={withModifiers(() => handleClick(item), ['native'])}
          ></CardTab>
        })
      }
    </div>
  }
})