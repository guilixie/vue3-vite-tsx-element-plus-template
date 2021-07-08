import { defineComponent } from 'vue'
import SearchForm from '@/components/search-form'
import TreeView from '@/components/tree-view'
import useForm from './services/useForm'
import useTreeView from './services/useTreeView'
import styles from './styles/index.module.scss'

export default defineComponent(() => {
  const { form: queryForm, options: queryOptions, search, reset, setSearch } = useForm()
  
  const { dataProps, data, searchVal, handleNodeDelete, handleNodeSave } = useTreeView()

  setSearch(() => {
    searchVal.value = queryForm.name
  })

  const slots = {
    addRoot: () => <el-button type="primary">新增市一级</el-button>
  }

  return () => <div class="basic-street-info">
    <SearchForm
      form={queryForm} 
      options={queryOptions} 
      onSearch={search.value}
      onReset={reset}>
    </SearchForm>
    <el-row class={styles.streetTreeContainer}>
      <el-col span={12}>
        <TreeView
          searchable={false} 
          highlight-current
          editable
          data-props={dataProps}
          data={data}
          search-val={searchVal.value}
          top-level={3}
          onNodeDelete={handleNodeDelete}
          onNodeSave={handleNodeSave}
          v-slots={slots}
        ></TreeView>
      </el-col>
    </el-row>
  </div>
})
