import type { IData } from '@/app'
import { cloneDeep } from '@/utils'
import { reactive } from 'vue'

type TCheckKey = string | number

export default function useCheck(props: Readonly<IData>) {
  const checkedKeys: {
    left: TCheckKey[],
    right: TCheckKey[]
  } = reactive({
    left: [],
    right: []
  })

  const halfCheckedKeys: {
    left: TCheckKey[],
    right: TCheckKey[]
  } = reactive({
    left: [],
    right: []
  })

  const nodeKey: string = props.nodeKey || props.dataProps.key
  const children: string = props.dataProps.children
  const parentId: string = props.dataProps.parentId

  // 转移树的已选节点
  const transferNodes = (sNodes: IData[], tNodes: IData[], checkedKeys: TCheckKey[], halfCheckedKeys: TCheckKey[]) => {
    const tfNodes: IData[] = []

    const doRun = (sNodes: IData[], checkedKeys: TCheckKey[], halfCheckedKeys: TCheckKey[]) => {
      return sNodes.reduce((acc: IData[], node: IData): IData[] => {
        node[children] = node[children] || []
        if (node[children].length) {
          node[children] = doRun(node[children], checkedKeys, halfCheckedKeys)
        }
        const isHalfChecked = halfCheckedKeys.includes(node[nodeKey])
        const isChecked = checkedKeys.includes(node[nodeKey])
        if (isHalfChecked || isChecked) {
          transferNode(tfNodes, node)
        }
        return isChecked ? acc : [...acc, node]
      }, [])
    }

    const rsNodes = doRun(sNodes, checkedKeys, halfCheckedKeys)

    sNodes = rsNodes

    tNodes = mergeNodes(tNodes, tfNodes)

    // console.log(sNodes, tfNodes, tNodes)

    return {
      sNodes,
      tNodes
    }
  }

  // 生成要转移的树
  const stack: IData[] = []
  const transferNode = (nodes: IData[], tNode: IData) => {
    // console.log(nodes, tNode)
    tNode = cloneDeep(tNode)
    // 不是root
    if (tNode[parentId]) {
      stack.push(tNode)
    } else {
      tNode[children] = []
      nodes.push(tNode)
      const caches = []
      while (stack.length) {
        const curNode = stack.pop()
        if (!curNode) continue
        caches.push(curNode)
        if (tNode[nodeKey] === curNode[parentId]) {
          curNode[children] = []
          tNode[children].push(curNode)
        } else {
          const pNode = caches.find((node: IData) => node[nodeKey] === curNode[parentId])
          if (pNode) {
            pNode[children].push(curNode)
          }
        }
      }
    }
  }

  // 合并两棵树
  const mergeNodes = (sNodes: IData[], tNodes: IData[]) => {
    // console.log(sNodes, tNodes)
    tNodes.forEach((tNode) => {
      const sameNodeIndex = sNodes.findIndex((sNode: IData) => sNode[nodeKey] === tNode[nodeKey])
      if (sameNodeIndex > -1) {
        sNodes[sameNodeIndex][children] = mergeNodes(sNodes[sameNodeIndex][children], tNode[children])
      } else {
        sNodes.push(tNode)
      }
    })
    return sNodes
  }

  // 去除叶子
  const filterLeaves = (sNodes: IData[], level = 0) => {
    const doFilter = (nodes: IData[], level: number) => nodes.filter((node: IData) => {
      if (node[children]?.length) {
        if (level > 0) {
          node[children] = doFilter(node[children], --level)
        }
        return true
      } else {
        return false
      }
    })
    return doFilter(sNodes, level)
  }

  return {
    checkedKeys,
    halfCheckedKeys,
    transferNodes,
    mergeNodes,
    filterLeaves
  }
}