import type { IData, ITableCol } from '@/app'
import useTable from '@/services/useTable'
import { noop } from '@/utils'

export default function (queryForm: IData): IData {
  // 表头配置
  const cols: ITableCol[] = [
    {
      prop: 'name',
      label: '资源包名称'
    },
    {
      prop: 'street',
      label: '街道'
    },
    {
      prop: 'algorithm',
      label: '算法包'
    }
  ]

  const { 
    actions,
    loading,
    data,
    pager,
    sort,
    selected,
    paging,
    sorting,
    setActions,
    getPagedData
  } = useTable(fetchData)

  setActions([
    {
      type: 'primary',
      label: '修改',
      key: 'update',
      cb: noop
    },
    {
      type: 'danger',
      label: '删除',
      key: 'del',
      cb: ({ row }: { row: IData }): void => {}
    }
  ])

  const setMockData = () => new Promise((resolve) => setTimeout(() => {
      const data = []
      let i = 0
      // for(; i < 10; i++) {
        data.push({
          id: i+1427,
          name: 'A资源包',
          street: '宁围街道，北干街道',
          algorithm: 'A算法包，B算法包，C算法包'
        })
      // }
      resolve({
        data,
        total: 100
      })
    }, (Math.random() + 0.5) * 1000)
  )

  // 获取数据
  async function fetchData () {
    console.log('fetchData', queryForm, pager.value)
    const res = await setMockData()
    return res
  }
  // 搜索
  function doSearch () {
    getPagedData()
  }

  // 初始化获取数据
  getPagedData()
  
  return {
    cols,
    actions,
    loading,
    data,
    pager,
    sort,
    selected,
    paging,
    sorting,
    setActions,
    doSearch
  }
}