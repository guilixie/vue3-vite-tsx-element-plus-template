import type { IData } from '@/app'
import { Ref } from 'vue'

interface IProps {
  selectedIdx: Ref<number | undefined>,
  genIndex: (x: number) => number,
  props: Readonly<IData>
}

const RadioColumn = ({ selectedIdx, genIndex, props }: IProps) => <el-table-column
  width="55"
  key="radio"
  align={props.align}
  headerAlign={props.headerAlign}
>
  {
    ({ $index }: { $index: number }) => <el-radio name="radio" model-value={selectedIdx.value} label={genIndex($index)}> </el-radio>
  }
</el-table-column>

export default RadioColumn