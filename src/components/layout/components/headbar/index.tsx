import { defineComponent } from 'vue'
import Title from './components/Title'
import Breadcrumb from './components/Breadcrumb'
import useBreadcrumb from './services/useBreadcrumb'
import useTitle from './services/useTitle'
import { useRoute } from 'vue-router'
import styles from './styles/index.module.scss'

export default defineComponent({
  name: 'Headbar',

  setup: () => {
    const route = useRoute()

    const { breadcrumbs } = useBreadcrumb()

    const { title } = useTitle()

    return () => <section class={styles.appHeadbarContainer}>
      <Title title={title.value} />
      <Breadcrumb breadcrumbs={breadcrumbs.value} />
    </section>
  }
})