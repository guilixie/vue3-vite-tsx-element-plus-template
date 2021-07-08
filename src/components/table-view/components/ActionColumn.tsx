import type { IData, ITableAction } from '@/app'
import { EmitsOptions, SetupContext, withModifiers } from 'vue'
import { judgeVal } from '../services/utils'

interface IProps {
  props: Readonly<IData>,
  context: SetupContext<EmitsOptions>
}

const ActionColumn = ({ props, context }: IProps) => {
  const slots = {
    default: ({ row, column, $index }: { row: IData, column: IData, $index: number }) => {
      const ActionBtn = (action: ITableAction) => {
        const handleClick = () => action.cb
          ? action.cb({ row, column, $index })
          : context.emit('emit-custom-event', action, { row, column, $index })

        return <el-link key={action.label}
          underline={props.actionsUnderline}
          type={action.type}
          v-show={!judgeVal(action.hide, { row })}
          disabled={judgeVal(action.disabled, { row })}
          onClick={withModifiers(handleClick, ['prevent', 'stop'])}>
          {action.label}
        </el-link>
      }

      return context.slots.actions
        ? context.slots.actions({ row, column, $index })
        : props.actions.map(ActionBtn)
    }
  }

  return <el-table-column
    fixed="right"
    label="操作"
    width={props.actionsWidth}
    align={props.align}
    header-align={props.headerAlign}
  >
    {slots}
  </el-table-column>
}

export default ActionColumn