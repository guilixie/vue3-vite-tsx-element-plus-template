import { defineComponent, inject, reactive } from 'vue'
import TreeTransfer from '@/components/tree-transfer'
import styles from '../../styles/AddDialog.module.scss'
import useStreetSelect from '../../services/useStreetSelect'

export default defineComponent({
  name: 'StreetSelect',
  setup: () => {
    const form = inject('form', reactive({ selected: [] }))

    const { titles, data, selected } = useStreetSelect(form)

    return () => <>
      <el-divider content-position="left">街道选择</el-divider>
      <TreeTransfer
        class={styles.streetSelectTransfer}
        default-expand-all
        highlight-current
        titles={titles}
        v-models={[[data.value, 'data'],[selected.value, 'modelValue']]}
      ></TreeTransfer>
    </>
  }
})