import type { IData, ITableCol } from '@/app'

interface IProps {
  col: ITableCol,
  props: Readonly<IData>
}

const DataColumn = ({ col, props }: IProps) => {
  const filterProps = ['slotHeader']
  const colProps = Object.entries(col).reduce((acc: IData, [key, val]) => {
    if (!filterProps.includes(key)) {
      acc[key] = val
    }
    return acc
  }, {})
  const slots = {
    header: col.slotHeader
  }
  return <el-table-column
    {...colProps}
    key={col.prop}
    align={props.align}
    header-align={props.headerAlign}
    sort-orders={['ascending', 'descending']}
    show-overflow-tooltip
    v-slots={slots}
  >
  </el-table-column>
}

export default DataColumn