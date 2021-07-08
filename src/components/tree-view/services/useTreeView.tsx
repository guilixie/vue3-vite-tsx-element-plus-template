

import type { IData } from '@/app'
import { Component, computed, EmitsOptions, nextTick, onMounted, reactive, ref, Ref, SetupContext, watch, withModifiers } from 'vue'
import styles from '../styles/index.module.scss'

export default function useTreeView(props: Readonly<IData>, ctx: SetupContext<EmitsOptions>, defaultProps: IData) {
  const treeRef: Ref<any> = ref(null)

  const state: {
    dkeys: string[],
    newNodeId: number,
    searchText: string,
    treeData: IData[],
    oldData: IData | null
  } = reactive({
    dkeys: [], // 默认打开的节点keys
    newNodeId: 9527, // 新增的节点id
    searchText: '', // 搜索条件
    treeData: [], // 树的数据
    oldData: null // 缓存旧节点数据
  })

  const computedProps = computed(() => {
    return {
      ...defaultProps,
      ...props.dataProps
    }
  })

  const nodeKey = computed(() => {
    return props.nodeKey || computedProps.value.key
  })

  // 基本操作方法，暂时封装在一块有时间拆分开
  const methods = {
    // 过滤方法
    filter(val: string) {
      state.searchText = val
    },
    genNewNodeId() {
      return state.newNodeId++
    },

    // 数据转换
    transformData(res: IData[], level: number = 1) {
      return res.map((node: IData) => {
        const polyfill = props.genOptByLevel(level, props.topLevel)
        const label = computedProps.value.label
        const children = computedProps.value.children
        return node[children]?.length
          ? {
            ...polyfill,
            ...node,
            [label]: props.getLabel(node, label),
            level,
            [children]: this.transformData(node[children], level + 1)
          }
          : {
            ...polyfill,
            ...node,
            [label]: props.getLabel(node, label),
            level
          }
      })
    },

    // 处理树数据
    handleData(list: IData[]) {
      state.treeData = this.transformData(list)
    },

    // 从父节点删除本节点
    delNodeSelf({ node, data }: { node: IData, data: IData[] }) {
      const children = node.level === 1 ? node.parent.data : node.parent.data[computedProps.value.children]
      const index = children.findIndex((d: IData) => d[nodeKey.value] === data[nodeKey.value])
      index !== -1 && children.splice(index, 1)
    },

    // 新增新节点
    addNewNode({ data }: { data: IData }) {
      const children = computedProps.value.children
      let level = data.level + 1
      const polyfill = props.genOptByLevel(level, props.topLevel)
      const newChild = {
        [nodeKey.value]: this.genNewNodeId(),
        [computedProps.value.label]: '',
        [computedProps.value.label]: '',
        [computedProps.value.parentId]: data[nodeKey.value],
        level,
        ...polyfill,
        isActive: true
      }
      if (!data[children]) {
        data[children] = []
      }
      data[children].push(newChild)
      return newChild
    },

    // 过滤
    filterNode(value: string, data: IData) {
      if (!value) return true
      return data[computedProps.value.label].indexOf(value) !== -1
    },

    // 自定义树的渲染
    renderContent(h: () => JSX.Element, { node, data }: { node: IData, data: IData }) {
      // console.log(node, data)
      const label = computedProps.value.label
      return !props.editable ? (
        <span class={styles.customTreeNode}>
          <span>
            {props.renderIcon(h, node)}
            <span>{data[label]}</span>
          </span>
        </span>
      ) : (
        <span class={styles.customTreeNode}>
          <span>
            {props.renderIcon(h, node)}
            {data.isActive ? (
              <span>
                <el-input
                  placeholder="请输入"
                  id={`input_${data[nodeKey.value]}`}
                  autofocus
                  v-model={data[label]}
                  onBlur={() => this.save(node, data)}
                  onClick={withModifiers((ev: IData) => { }, ['native', 'stop'])}
                  onKeyup={withModifiers((ev: IData) => ev.keyCode === 13 && ev.target.blur(), ['native'])}
                />
              </span>
            ) : (
              <span>{data[label]}</span>
            )}
          </span>
          <span class={styles.tvEditWrap}>
            {data.isAdd && (
              <el-link
                class={`${styles.tvActionIcon} ${styles.tvActionIconAdd}`}
                type="primary"
                underline={false}
                disabled={props.judgeActionDisabled({ node, data })}
                onClick={withModifiers((ev: IData) => this.clickAdd(node, data), ['prevent', 'stop'])}
              >
                {props.renderActionIcon(h, 'add')}
              </el-link>
            )}
            {data.isEdit && (
              <el-link
                class={`${styles.tvActionIcon} ${styles.tvActionIconEdit}`}
                type="warning"
                underline={false}
                disabled={props.judgeActionDisabled({ node, data })}
                onClick={withModifiers((ev: IData) => this.clickEdit(node, data), ['prevent', 'stop'])}
              >
                {props.renderActionIcon(h, 'edit')}
              </el-link>
            )}
            {data.isDel && (
              <el-link
                class={`${styles.tvActionIcon} ${styles.tvActionIconDel}`}
                type="danger"
                underline={false}
                disabled={props.judgeActionDisabled({ node, data })}
                onClick={withModifiers((ev: IData) => this.clickDel(node, data), ['prevent', 'stop'])}
              >
                {props.renderActionIcon(h, 'del')}
              </el-link>
            )}
            {props.renderExtContent(h, { node, data })}
          </span>
        </span>
      )
    },

    // 输入框获取焦点
    async inputFocus(data: IData, isEdit: boolean) {
      await nextTick()
      const el: IData | null = document.querySelector(`#input_${data[nodeKey.value]}`)
      if (!el) return
      let timer = setTimeout(() => {
        isEdit ? el.select() : el.focus()
        clearTimeout(timer)
      })
    },

    // 新增一级目录
    addRoot() {
      state.oldData = null
      let level = 1
      const polyfill = props.genOptByLevel(level, props.topLevel)
      const newChild = {
        [nodeKey.value]: this.genNewNodeId(),
        [computedProps.value.label]: '',
        [computedProps.value.parentId]: null,
        level,
        ...polyfill,
        isActive: true
      }
      state.treeData.push(newChild)
      this.inputFocus(newChild)
      ctx.emit('nodeAdd', { data: newChild })
    },

    // 点击编辑
    clickEdit(node: IData, data: IData) {
      state.oldData = { ...data }
      props.beforeEdit({ node, data })
      data.isActive = true
      this.inputFocus(data, true)
      ctx.emit('nodeEdit', { data, node })
    },

    // 点击删除
    clickDel(node: IData, data: IData) {
      state.oldData = { ...data }
      ctx.emit('nodeDelete', { data, node })
    },

    // 点击新增
    clickAdd(node: IData, data: IData) {
      state.oldData = null
      // 打开节点
      node.expanded = true
      // 新增假节点
      const newChild = this.addNewNode({ data })
      // 输入框获取焦点
      this.inputFocus(newChild)
      ctx.emit('nodeAdd', { data, node })
    },

    // 保存
    save(node: IData, data: IData) {
      const label = computedProps.value.label
      // 如果新增的节点，并且输入为空，则不请求
      if (!state.oldData) {
        if (!data[label]) {
          data.isActive = false
          this.delNodeSelf({ node, data })
          return
        }
      } else {
        props.afterEdit({ node, data })
        // 如果修改节点，但没有改名字，则不请求
        if (data[label] === state.oldData[label]) {
          data.isActive = false
          return
        }
      }
      // 参数[ {oldData, data, node}, next ], next 保存成功后调用
      ctx.emit('nodeSave', {
        oldData: state.oldData, data, node
      },
        () => (data.isActive = false)
      )
    },

    // 节点展开
    handleNodeExpand(data: IData, node: IData, component: Component) {
      if (!state.dkeys.includes(node.key)) {
        state.dkeys.push(node.key)
      }
      // console.log('node-expand', data, node, node.expanded, state.dkeys)
      ctx.emit('expand', { data, node, component })
    },
    // 节点关闭
    handleNodeCollapse(data: IData, node: IData, component: Component) {
      if (state.dkeys.includes(node.key)) {
        state.dkeys = state.dkeys.filter((key) => key !== node.key)
      }
      // console.log('node-collapse', data, node, node.expanded, state.dkeys)
      ctx.emit('collapse', { data, node, component })
    },

    // 获取树的各节点数据
    getTreeNodesData() {
      const treeComp = treeRef.value
      return treeComp ? Object.values(treeComp.store.nodesMap) : []
    },

    // 通过 key 设置某个节点的当前选中状态，使用此方法必须设置 node-key 属性
    // (key) 待被选节点的 key，若为 null 则取消当前高亮的节点
    setCurrentKey(nodeKey: string) {
      const treeComp = treeRef.value
      if (treeComp) treeComp.setCurrentKey(nodeKey)
    },

    // 通过 node 设置某个节点的当前选中状态，使用此方法必须设置 node-key 属性
    setCurrentNode(node: IData) {
      const treeComp = treeRef.value
      if (treeComp) treeComp.setCurrentNode(node)
    },

    // 获取当前被选中节点的 data，若没有节点被选中则返回 null
    getCurrentNode() {
      const treeComp = treeRef.value
      if (treeComp) {
        return treeComp.getCurrentNode()
      }
      return null
    },

    // 获取当前被选中节点的 key，使用此方法必须设置 node-key 属性，若没有节点被选中则返回 null
    getCurrentKey() {
      const treeComp = treeRef.value
      if (treeComp) {
        return treeComp.getCurrentKey()
      }
      return null
    },

    // 获取树当前打开的节点
    getAllExpandedKeys() {
      // return this.getTreeNodesData().reduce((acc, node) => (node.expanded ? acc.concat(node.key) : acc), [])
      return state.dkeys
    },

    // 获取树当前的打开状态和当前选中节点keys
    getExpandedKeysAndCurrentKey() {
      // let currentKey
      // const expandedKeys = this.getTreeNodesData().reduce((acc, node) => {
      //   if (node.isCurrent) {
      //     currentKey = node.key
      //   }
      //   return node.expanded ? acc.concat(node.key) : acc
      // }, [])
      // return {
      //   currentKey,
      //   expandedKeys
      // }
      return {
        currentKey: this.getCurrentKey(),
        expandedKeys: state.dkeys
      }
    },

    // 设置树当前的打开状态和当前选中节点keys
    setExpandedKeysAndCurrentKey({ currentKey, expandedKeys }: { currentKey: string, expandedKeys: string[] }) {
      state.dkeys = expandedKeys
      this.setCurrentKey(currentKey)
    }
  }

  // 初始化状态
  state.dkeys = props.expandedKeys
  methods.handleData(props.data)

  // 监听
  watch(() => state.searchText, (val) => {
    // console.log('filter:', val)
    treeRef.value.filter(val)
  })
  watch(() => props.data, (val: IData[]) => {
    methods.handleData(val)
  })
  watch(() => props.expandedKeys, (val: string[]) => {
    state.dkeys = val
  })
  watch(() => props.searchVal, (val: string) => {
    methods.filter(val)
  })
  watch(() => props.defaultCheckedKeys, (val) => {
    treeRef.value.setCheckedKeys(val)
  })

  onMounted(async () => {
    await nextTick()
    state.searchText = props.searchVal
  })

  return {
    state,
    treeRef,
    computedProps,
    nodeKey,
    methods
  }
}
