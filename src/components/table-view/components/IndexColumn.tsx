import type { IData } from '@/app'

interface IProps {
  props: Readonly<IData>,
  genIndex: (x: number) => number
}

const IndexColumn = ({ props, genIndex }: IProps) => <el-table-column
  label="序号"
  key="index"
  type="index"
  width="55"
  align={props.align}
  headerAlign={props.headerAlign}
  index={genIndex}
></el-table-column>

export default IndexColumn