import type { IData } from '@/app'
import { defineComponent, SetupContext, EmitsOptions, PropType } from 'vue'
import TransferPanel from './components/TransferPanel'
import TransferButtons from './components/TransferButtons'
import styles from './styles/index.module.scss'
import { defaultProps } from '../tree-view'
import useTreeTransfer from './services/useTreeTransfer'

export default defineComponent({
  name: 'TreeTransfer',
  props: {
    data: {
      type: Array as PropType<IData[]>,
      default: (): IData[] => []
    }, // 可选值，树形结构
    modelValue: {
      type: Array as PropType<string[] | number[]>,
      default: (): string[] | number[] => []
    },  // 已选值
    filterable: { type: Boolean, default: true }, // 是否可搜索
    filterPlaceholder: { type: String, default: '请输入搜索内容' }, // 搜索框占位符
    filterMethod: Function, // 自定义搜索方法
    emptyText: { type: String, default: '无数据' }, // 无数据
    titles: {
      type: Array as PropType<string[]>,
      default: (): string[] => ['列表1', '列表2']
    }, // 自定义列表标题
    buttonTexts: {
      type: Array as PropType<string[]>,
      default: (): string[] => []
    }, // 自定义按钮文案
    leftDefaultChecked: {
      type: Array,
      default: () => []
    }, // 初始状态下左侧列表的已勾选项的 key 数组
    rightDefaultChecked: {
      type: Array,
      default: () => []
    }, // 初始状态下右侧列表的已勾选项的 key 数组
    leftDefaultHalfChecked: {
      type: Array,
      default: () => []
    }, // 初始状态下左侧列表的已半勾选项的 key 数组
    rightDefaultHalfChecked: {
      type: Array,
      default: () => []
    }, // 初始状态下右侧列表的已半勾选项的 key 数组
    renderContent: Function, // 树节点的内容区的渲染 Function(h, { node, data, store }
    nodeKey: {
      type: String,
      default: 'id'
    }, // 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
    dataProps: {
      type: Object,
      default: () => defaultProps
    }, // 配置选项
  },
  emits: ['update:modelValue', 'update:data'],
  setup(props: Readonly<IData>, ctx: SetupContext<EmitsOptions>) {
    const { dataStore, checkedKeys, halfCheckedKeys, buttonDisableds, handleTransferLeft, handleTransferRight } = useTreeTransfer(props, ctx)

    return () => <div class={`el-transfer ${styles.treeTransfer}`}>
      <TransferPanel
        title={props.titles[0]}
        data={dataStore.left}
        v-models={[[checkedKeys.left, 'modelValue'], [halfCheckedKeys.left, 'halfCheckedKeys']]}
        filterable={props.filterable}
        filter-placeholder={props.filterPlaceholder}
        filter-method={props.filterMethod}
        data-props={props.dataProps}
        node-key={props.nodeKey}
        render-content={props.renderContent}
        empty-text={props.emptyText}
        {...ctx.attrs}
        v-slots={{ header: ctx.slots.leftHeader, footer: ctx.slots.leftFooter }}
      ></TransferPanel>
      <div class="el-transfer__buttons">
        <TransferButtons
          button-texts={props.buttonTexts}
          button-disableds={buttonDisableds.value}
          onTransferLeft={handleTransferLeft}
          onTransferRight={handleTransferRight}
        ></TransferButtons>
      </div>
      <TransferPanel
        title={props.titles[1]}
        data={dataStore.right}
        v-models={[[checkedKeys.right, 'modelValue'], [halfCheckedKeys.right, 'halfCheckedKeys']]}
        filterable={props.filterable}
        filter-placeholder={props.filterPlaceholder}
        filter-method={props.filterMethod}
        data-props={props.dataProps}
        node-key={props.nodeKey}
        render-content={props.renderContent}
        empty-text={props.emptyText}
        {...ctx.attrs}
        v-slots={{ header: ctx.slots.rightHeader, footer: ctx.slots.rightFooter }}
      ></TransferPanel>
    </div>
  }
})