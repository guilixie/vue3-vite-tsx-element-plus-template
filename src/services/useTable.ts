import type { IData, IPager, ISort, ITableAction } from '@/app'
import { delayDo, isDef } from '@/utils'
import { reactive, toRefs } from 'vue'

type TableProps = {
  loading: boolean, // 加载中
  data: IData[],  // 表格数据
  pager: IPager,  // 分页参数
  sort: ISort, // 排序参数
  selected: IData[],  // 选中项
  actions: ITableAction[]  // 操作配置
}

type ResData = {
  data: IData[],
  total: number | string
}

// 合并actions,有则改之，无则加入
export function mergeActions(oldActions: ITableAction[], newActions: ITableAction[]): ITableAction[] {
  const actionsMap: Map<string, ITableAction> = oldActions.reduce((acc: Map<string, ITableAction>, action: ITableAction): Map<string, ITableAction> => {
    if (action.key) acc.set(action.key, action)
    return acc
  }, new Map())
  const addActions: ITableAction[] = []
  const curActions: ITableAction[] = []
  // 合并
  newActions.forEach((action: ITableAction) => {
    if (action.key && actionsMap.has(action.key)) {
      curActions.push({
        ...actionsMap.get(action.key),
        ...action
      })
    } else {
      addActions.push(action)
    }
  })
  return [
    ...curActions,
    ...addActions
  ]
}

export default function useTable(fetchData: () => Promise<any> | any, hasLoading: boolean = true) {
  // 表格相关状态（响应式）
  const state: TableProps = reactive({
    loading: false,
    data: [],
    pager: {
      currentPage: 1,
      pageSize: 10,
      total: 0
    },
    sort: {
      column: null,
      prop: null,
      order: null
    },
    selected: [],
    actions: []
  })

  function setLoading(val: boolean): void {
    state.loading = val
  }

  function setData(val: IData[]): void {
    state.data = val
  }

  function setSelected(val: IData[]): void {
    state.selected = val
  }

  function setPager(val: IPager): void {
    state.pager = val
  }

  function setActions(val: ITableAction[]): void {
    state.actions = mergeActions(state.actions, val)
  }

  // 加载数据
  async function loadData(load = fetchData) {
    if (hasLoading) {
      // 显示加载中
      const cancelLoading = delayDo(() => setLoading(true))
      await load()
      cancelLoading(() => setLoading(false))
    } else {
      await load()
    }
  }
  const cachePager = {
    currentPage: 1,
    pageSize: 10
  }
  // 分页
  async function paging(option: IPager): Promise<void> {
    console.log('paging', option)
    if (isDef(option.currentPage)) {
      cachePager.currentPage = option.currentPage
    }
    if (isDef(option.pageSize)) {
      cachePager.pageSize = option.pageSize
    }
    await getPagedData()
  }
  // 排序
  async function sorting(option: ISort): Promise<void> {
    console.log('sorting', option)
    state.sort = option
    await getPagedData()
  }
  // 获取数据
  async function getData() {
    await loadData()
  }
  // 获取数据，自动设置数据和分页
  async function getPagedData() {
    await loadData(async () => {
      const { data = [], total = 0 }: ResData = await fetchData()
      setData(data)
      setPager({
        currentPage: cachePager.currentPage,
        pageSize: cachePager.pageSize,
        total: Number(total)
      })
    })
  }

  const stateRefs = toRefs(state)

  return {
    ...stateRefs,
    setLoading,
    setData,
    setSelected,
    setPager,
    setActions,
    paging,
    sorting,
    loadData,
    getData,
    getPagedData
  }
}