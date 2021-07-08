import { IData } from '@/app'
import useCheck from '@/services/useCheck'
import useTable from '@/services/useTable'
import { defineComponent, inject, reactive } from 'vue'

export default defineComponent({
  name: 'ResDistribute',
  setup: () => {
    const form = inject('form', {})

    const TRUE_LABEL = 1
    const FALSE_LABEL = 0
    const statusProp = 'status'

    const { data, setData, getData } = useTable(fetchData)

    const { allChecked, judgeCheckedAll } = useCheck({ data, statusProp, TRUE_LABEL, FALSE_LABEL })

    // 测试数据
    const setMockData = () => new Promise((resolve) => {
      setTimeout(() => {
        setData([
          {
            name: 'A算法包',
            type: '出店经营，流动摊贩',
            asyncPower: 80,
            distributeAsyncPower: 20,
            [statusProp]: 1
          },
          {
            name: 'B算法包',
            type: '城管犬类',
            asyncPower: 15,
            distributeAsyncPower: 10,
            [statusProp]: 1
          },
          {
            name: 'C算法包',
            type: '市域治理',
            asyncPower: 20,
            distributeAsyncPower: 10,
            [statusProp]: 1
          },
          {
            name: 'D算法包',
            type: '河道漂浮物',
            asyncPower: 20,
            distributeAsyncPower: 5,
            [statusProp]: 1
          }
        ])
        resolve(data.value)
      }, 1000)
    })
    
    // 获取数据
    async function fetchData () {
      console.log('fetchData')
      await setMockData()
      judgeCheckedAll()
    }
    
    // 初始化获取数据
    getData()

    return () => <>
      <el-divider content-position="left">算力资源分配</el-divider>
      <el-checkbox v-model={allChecked.value} style="padding-bottom:10px;float:right;">全部启用</el-checkbox>
      <el-table border class="app-config-table" data={data.value}>
        <el-table-column label="算法包名称" prop="name"></el-table-column>  
        <el-table-column label="算法类型" prop="type"></el-table-column>  
        <el-table-column label="可分配并发能力（路）" prop="asyncPower"></el-table-column>  
        <el-table-column label="分配并发能力（路）" prop="distributeAsyncPower">
          {
            ({ row }:{ row: IData }) => {
              return <el-input v-model={row.distributeAsyncPower}></el-input>
            }
          }
        </el-table-column>  
        <el-table-column label="是否启用" prop={statusProp}>
          {
            ({ row }:{ row: IData }) => {
              return <el-checkbox true-label={1} false-label={0} v-model={row[statusProp]}></el-checkbox>
            }
          }
        </el-table-column>  
      </el-table>
    </>
  }
})