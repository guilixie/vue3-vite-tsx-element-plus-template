import type { IData, ITableCol } from '@/app'
import useTable from '@/services/useTable'

export default function (queryForm: IData): IData {
  // 表头配置
  const cols: ITableCol[] = [
    {
      prop: 'name',
      label: '厂商名称'
    },
    {
      prop: 'type',
      label: '类别'
    },
    {
      prop: 'account',
      label: '会话帐号'
    },
    {
      prop: 'password',
      label: '密码'
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
      cb: ({ row }: { row: IData }): void => {}
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
          name: '城云',
          type: '算法厂商，监控厂商',
          account: 'xxxx',
          password: 'yyyy'
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