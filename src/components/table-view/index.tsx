import { defineComponent, SetupContext, EmitsOptions, PropType } from 'vue'
import Pagination from '../pagination'
import type { IData, ITableCol, ITableAction, IPager } from '@/app'
import SelectionColumn from './components/SelectionColumn'
import RadioCloumn from './components/RadioColumn'
import IndexColumn from './components/IndexColumn'
import DataColumn from './components/DataColumn'
import ActionColumn from './components/ActionColumn'
import useTableView from './services/useTableView'

export default defineComponent({
  name: 'TableView',
  inheritAttrs: false,
  emits: ['update:selected', 'emit-custom-event'],
  props: {
    type: {
      type: String,
      default: ''
    },
    cols: {
      type: Array as PropType<ITableCol[]>,
      default: (): ITableCol[] => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadingText: {
      type: String,
      default: '拼命加载中'
    },
    loadingSpinner: {
      type: String,
      default: 'el-icon-loading'
    },
    loadingBg: {
      type: String,
      default: ''
    },
    pager: {
      type: Object as PropType<IPager>,
      default: (): IPager => ({
        currentPage: 1,
        pageSize: 10,
        total: 0
      })
    },
    selected: {
      type: Array as PropType<any[]>,
      default: (): any[] => []
    },
    align: {
      type: String,
      default: 'center' // left/center/right
    },
    headerAlign: {
      type: String,
      default: 'center'
    },
    hasIndex: {
      type: Boolean,
      default: true
    },
    hasPager: {
      type: Boolean,
      default: true
    },
    actions: {
      type: Array as PropType<ITableAction[]>,
      default: (): ITableAction[] => []
    },
    actionsWidth: {
      type: String,
      default: '150px'
    },
    actionsUnderline: {
      type: Boolean,
      default: false
    }
  },
  setup: (props: Readonly<IData>, context: SetupContext<EmitsOptions>): IData => {
    const { tableRef, handleCurrentChange, handleSelectionChange, selectedIdx, genIndex } = useTableView(props, context)

    return () => <div class="app-table-container">
      <el-table ref={tableRef}
        v-loading={props.loading}
        element-loading-text={props.loadingText}
        element-loading-spinner={props.loadingSpinner}
        element-loading-background={props.loadingBg}
        {...context.attrs}
        onCurrentChange={props.type === 'single' && handleCurrentChange}
        onSelectionChange={props.type === 'multiple' && handleSelectionChange}
        tooltip-effect="dark"
        style="width: 100%">
        {
          props.type === 'single' && RadioCloumn({ props, selectedIdx, genIndex })
        }
        {
          props.type === 'multiple' && SelectionColumn(props)
        }
        {
          props.hasIndex && IndexColumn({ props, genIndex })
        }
        {
          props.cols?.length && props.cols.map((col: ITableCol) => DataColumn({ col, props }))
        }
        {
          props.actions?.length && ActionColumn({ props, context })
        }
      </el-table>
      {props.hasPager && <Pagination {...context.attrs} {...props.pager}></Pagination>}
    </div>
  }
})