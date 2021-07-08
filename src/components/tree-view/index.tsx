import type { IData } from '@/app'
import { defineComponent, EmitsOptions, PropType, SetupContext, withModifiers } from 'vue'
import useTreeView from './services/useTreeView'
import styles from './styles/index.module.scss'

export const defaultProps = {
  key: 'id',
  label: 'label',
  children: 'children',
  disabled: 'disabled',
  isLeaf: 'isLeaf',
  parentId: 'parentId'
}

export default defineComponent({
  name: 'TreeView',
  inheritAttrs: false,
  emits: ['refresh', 'nodeAdd', 'nodeEdit', 'nodeDelete', 'nodeSave', 'expand', 'collapse'],
  props: {
    title: {
      type: String,
      default: ''
    }, // 标题
    loading: {
      type: Boolean,
      default: false
    }, // 加载中
    highlightCurrent: {
      type: Boolean,
      default: false
    }, // 是否高亮当前
    autoExpandParent: {
      type: Boolean,
      default: false
    }, // 展开子节点的时候是否自动展开父节点，官方默认true，有坑
    defaultExpandAll: {
      type: Boolean,
      default: false
    }, // 是否默认展开所有节点
    searchable: {
      type: Boolean,
      default: true
    }, // 是否有搜索框
    editable: {
      type: Boolean,
      default: false
    }, // 是否可编辑
    refreshable: {
      type: Boolean,
      default: false
    }, // 是否可刷新
    topLevel: {
      type: Number,
      default: 3
    }, // 树最多的层数
    data: {
      type: Array as PropType<IData[]>,
      default: (): IData[] => []
    }, // 树数据
    nodeKey: {
      type: String,
      default: 'id'
    }, // 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
    emptyText: {
      type: String,
      default: '结果为空'
    }, // 数据为空
    expandedKeys: {
      type: Array as PropType<any[]>,
      default: (): any[] => []
    }, // 默认打开的树节点
    dataProps: {
      type: Object,
      default: () => defaultProps
    }, // 配置选项
    getLabel: {
      type: Function,
      default: (data: IData, label: string) => data[label]
    }, // 获取label方法
    beforeEdit: {
      type: Function,
      default: () => null
    }, // 编辑前钩子
    afterEdit: {
      type: Function,
      default: () => null
    }, // 编辑后钩子
    genOptByLevel: {
      type: Function,
      default: (level: number, topLevel: number) => ({
        isEdit: true,
        isDel: true,
        isAdd: level !== topLevel,
        isActive: false
      })
    }, // 通过level获取额外状态属性方法，即树的操作按钮控制
    renderIcon: {
      type: Function,
      default: (h: () => JSX.Element, node: IData) => null
      // <i class={`${node.expanded ? 'el-icon-folder-opened' : 'el-icon-folder'} ${styles.nodeIcon}`} />
    }, // 渲染图标
    renderActionIcon: {
      type: Function,
      default: (h: () => JSX.Element, type: string) =>
        <i class={type === 'add' ? 'el-icon-circle-plus-outline' : type === 'edit' ? 'el-icon-edit-outline' : 'el-icon-delete'}></i>
    }, // 操作图标切换
    judgeActionDisabled: {
      type: Function,
      default: () => false
    }, // 操作按钮是否禁用
    renderExtContent: {
      type: Function,
      default: () => null
    }, // 渲染额外的编辑节点操作
    searchVal: {
      type: String,
      default: ''
    }, // 外部过滤
    filterPlaceholder: {
      type: String,
      default: '请输入搜索内容'
    },
    filterNodeMethod: Function, // 对树节点进行筛选时执行的方法，返回 true 表示这个节点可以显示，返回 false 则表示这个节点会被隐藏
    renderContent: Function, // 树节点的内容区的渲染 Function
    defaultCheckedKeys: Array // 默认勾选的节点的 key 的数组
  },

  setup: (props: Readonly<IData>, ctx: SetupContext<EmitsOptions>) => {
    const { state, treeRef, computedProps, nodeKey, methods } = useTreeView(props, ctx, defaultProps)

    // 默认的slots
    const Title = ctx.slots.title || (() => <h4>
      {props.title}
      {
        props.refreshable && <el-link
          icon={props.loading ? 'el-icon-loading' : 'el-icon-refresh'}
          class={`${styles.headActionIcon} ${styles.treeLoading}`}
          type="primary"
          title="刷新"
          underline={false}
          onClick={withModifiers(() => ctx.emit('refresh'), ['prevent', 'stop'])}></el-link>
      }
    </h4>
    )

    const AddRoot = ctx.slots.addRoot || (() => <el-link type="primary" title="新建目录" underline={false}>
      <i class="el-icon-circle-plus-outline"></i>
    </el-link>
    )

    // 返回render函数
    return () => <el-scrollbar class={styles.treeView}>
      <div class={styles.treeHead}>
        {
          props.title && <div class={styles.treeTitle}>
            {Title()}
          </div>
        }
        {
          props.searchable && <el-input
            clearable
            placeholder={props.filterPlaceholder}
            suffix-icon={state.searchText ? '' : 'el-icon-search'}
            v-model={state.searchText}
            class={`tree-input ${props.editable ? styles.editable : ''}`}
          >
          </el-input>
        }
        {
          props.editable && <div class={styles.headActionIcon} onClick={withModifiers(methods.addRoot.bind(methods), ['prevent', 'stop'])}>
            {AddRoot()}
          </div>
        }
      </div>
      <el-tree
        ref={treeRef}
        {...ctx.attrs}
        props={computedProps.value}
        highlight-current={props.highlightCurrent}
        auto-expand-parent={props.autoExpandParent}
        node-key={nodeKey.value}
        data={state.treeData}
        empty-text={props.loading ? '' : props.emptyText}
        default-expanded-keys={state.dkeys}
        default-expand-all={props.defaultExpandAll}
        filter-node-method={props.filterNodeMethod || methods.filterNode.bind(methods)}
        render-content={props.renderContent || methods.renderContent.bind(methods)}
        onNodeExpand={methods.handleNodeExpand.bind(methods)}
        onNodeCollapse={methods.handleNodeCollapse.bind(methods)}
        v-loading={props.loading}
        element-loading-text={props.loading ? '拼命加载中' : null}
        element-loading-spinner={props.loading ? 'el-icon-loading' : null}
      >
      </el-tree>
    </el-scrollbar>
  }
})
