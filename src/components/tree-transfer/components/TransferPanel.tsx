import type { IData } from '@/app'
import TreeView from '@/components/tree-view'
import { computed, defineComponent, EmitsOptions, PropType, Ref, SetupContext } from 'vue'

type CheckInfoData = {
  checkedNodes: IData[],
  halfCheckedNodes: IData[],
  checkedKeys: string[] | number[],
  halfCheckedKeys: string[] | number[]
}

export default defineComponent({
  name: 'TransferPanel',
  props: {
    title: {
      type: String,
      default: ''
    },
    data: {
      type: Array as PropType<IData[]>,
      default: (): IData[] => []
    }, // 可选值，树形结构
    modelValue: {
      type: Array as PropType<string[] | number[]>,
      default: (): string[] | number[] => []
    }, // 列表的已勾选项的 key 数组
    filterable: { type: Boolean, default: true }, // 是否可搜索
    filterPlaceholder: { type: String, default: '请输入搜索内容' }, // 搜索框占位符
    filterMethod: Function, // 自定义搜索方法
    renderContent: Function, // 树节点的内容区的渲染 Function(h, { node, data, store }
    nodeKey: String, // 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
    dataProps: Object, // 树的节点配置选项
    emptyText: String, // 无数据
  },
  emits: ['update:modelValue', 'update:halfCheckedKeys'],
  setup: (props: Readonly<IData>, ctx: SetupContext<EmitsOptions>) => {
    const isShowTree: Ref<boolean> = computed(() => !!props.data.length)

    const headerSlot = ctx.slots.header || (({ title }) => <span>{title}</span>)
    const footerSlot = ctx.slots.footer

    const handleCheck = (data: IData, { checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys }: CheckInfoData) => {
      ctx.emit('update:modelValue', checkedKeys)
      ctx.emit('update:halfCheckedKeys', halfCheckedKeys)
    }

    return () => <div class="el-transfer-panel">
      <p class="el-transfer-panel__header">
        {headerSlot(props)}
      </p>
      <div class={`el-transfer-panel__body${!footerSlot ? '' : ' is-with-footer'}`}>
        <p class="el-transfer-panel__empty" v-show={!isShowTree.value}>{props.emptyText}</p>
        {
          isShowTree.value && <TreeView
            show-checkbox
            searchable={props.filterable}
            filter-placeholder={props.filterPlaceholder}
            filter-node-method={props.filterMethod}
            data-props={props.dataProps}
            node-key={props.nodeKey}
            render-content={props.renderContent}
            data={props.data}
            default-checked-keys={props.modelValue}
            onCheck={handleCheck}
            {...ctx.attrs}
          ></TreeView>
        }
      </div>
      {
        footerSlot && <p class="el-transfer-panel__footer">
          {footerSlot(props)}
        </p>
      }
    </div>
  }
})