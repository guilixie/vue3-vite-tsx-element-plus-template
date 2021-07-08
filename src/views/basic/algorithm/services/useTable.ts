import type { IData, ITableCol } from '@/app'
import useTable from '@/services/useTable'
import { noop } from '@/utils'
import { STATUS_ENUM } from '@/utils/constant'
import { h } from 'vue'

export default function (queryForm: IData): IData {
  // 表头配置
  const cols: ITableCol[] = [
    {
      prop: 'id',
      label: '算法包ID'
    },
    {
      prop: 'name',
      label: '算法包名称'
    },
    {
      prop: 'manufacturer',
      label: '厂商'
    },
    {
      prop: 'type',
      label: '算法类型'
    },
    {
      prop: 'serverUrl',
      label: '服务地址'
    },
    {
      prop: 'asyncPower',
      label: '总并发能力（路）'
    },
    {
      prop: 'identifyType',
      label: '识别方式'
    },
    {
      prop: 'status',
      label: '启用状态',
      formatter: (row, column, cellValue, index) => {
        // console.log(row, column, cellValue, index)
        return h('span', { class: cellValue === STATUS_ENUM['启用'] ? 'color-success' : 'color-danger' }, STATUS_ENUM[cellValue])
      }
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
      label: '配置',
      key: 'setting',
      cb: noop
    },
    {
      type: 'danger',
      label: '删除',
      key: 'del',
      cb: ({ row }: { row: IData }): void => { }
    },
    {
      type: 'primary',
      label: '启用',
      key: 'start',
      hide: (row: IData): boolean => {
        return row.status === STATUS_ENUM['启用']
      },
      cb: noop
    },
    {
      type: 'danger',
      label: '停用',
      key: 'stop',
      hide: (row: IData): boolean => {
        return row.status === STATUS_ENUM['停用']
      },
      cb: noop
    }
  ])

  const setMockData = () => new Promise((resolve) => setTimeout(() => {
    const data = []
    let i = 0
    // for(; i < 10; i++) {
    data.push({
      id: i + 1427,
      name: 'A算法包',
      manufacturer: '城云',
      type: '出店经营,流动摊贩',
      serverUrl: 'http://10.12.102.132:8082/server/api/v1',
      asyncPower: 80,
      identifyType: '0',
      status: 1
    })
    // }
    resolve({
      data,
      total: 25
    })
  }, (Math.random() + 0.5) * 1000)
  )

  // 获取数据
  async function fetchData() {
    console.log('fetchData', queryForm, pager.value)
    const res = await setMockData()
    return res
  }
  // 搜索
  function doSearch() {
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