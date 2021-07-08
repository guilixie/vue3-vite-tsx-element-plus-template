import type { IData } from '@/app'

const SelectionColumn = (props: Readonly<IData>) => <el-table-column
  type="selection"
  key="selection"
  width="55"
  align={props.align}
  headerAlign={props.headerAlign}
></el-table-column>

export default SelectionColumn