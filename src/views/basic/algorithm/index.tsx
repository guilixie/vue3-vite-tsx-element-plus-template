import { defineComponent } from 'vue'
import type { IData } from '@/app'
import SearchForm from '@/components/search-form'
import TableView from '@/components/table-view'
import ActionBtns from '@/components/action-btns'
import AddDialog from './components/add-alg-dialog'
import useForm from './services/useForm'
import useTable from './services/useTable'
import useBtns from './services/useBtns'

export default defineComponent(() => {

  const { form: queryForm, options: queryOptions, search, reset, setSearch } = useForm()

  const { cols, actions, loading, data, pager, selected, paging, setActions, doSearch } = useTable(queryForm)

  const btnOpt: IData = useBtns(selected)

  const { leftBtnOptions, formData, addDialogVisible, setAddDialogVisible, start, stop, update, del } = btnOpt

  // 设置表单搜索方法
  setSearch(doSearch)
  // 设置表格按钮响应
  setActions([
    {
      key: 'setting',
      cb: update
    },
    {
      key: 'del',
      cb: ({ row }: { row: IData }): void => {
        del([row])
      }
    },
    {
      key: 'start',
      cb: ({ row }: { row: IData }): void => {
        start([row])
      }
    },
    {
      key: 'stop',
      cb: ({ row }: { row: IData }): void => {
        stop([row])
      }
    }
  ])

  return () => (
    <div class="basic-algorithm">
      <SearchForm
        form={queryForm}
        options={queryOptions}
        onSearch={search.value}
        onReset={reset}>
      </SearchForm>
      <div class="app-action-container">
        <ActionBtns options={leftBtnOptions}></ActionBtns>
      </div>
      <TableView
        border={true}
        type="multiple"
        loading={loading.value}
        data={data.value}
        pager={pager.value}
        v-model={[selected.value, 'selected']}
        cols={cols}
        actions={actions.value}
        onPaging={paging}>
      </TableView>
      <AddDialog
        visible={addDialogVisible.value}
        set-visible={setAddDialogVisible}
        form-data={formData.data}
        is-update={formData.isUpdate}
      ></AddDialog>
    </div>
  )
})