import type { IData } from '@/app'

// 获取路径
export function getFullPath(pathNodeArr: IData[], root = '/') {
  return (
    root +
    pathNodeArr.reduce((acc, node) => {
      return node.label ? node.label + '/' + acc : ''
    }, '')
  )
}

// 获取路径ids
export function getFullKeys(pathNodeArr: IData[]) {
  return pathNodeArr.map((node) => node.data.id).reverse()
}

// 获取节点路径
export function getFullNodePath(node: IData, pathNodeArr: IData[]) {
  if (!node) return
  node.level > 0 && pathNodeArr.push(node)
  if (node.parent) {
    getFullNodePath(node.parent, pathNodeArr)
  }
}

// 获取目录的叶子节点
export function getLeafNodes(node: IData, leafNodeArr: IData[]) {
  if (node.isLeaf) {
    leafNodeArr.push(node)
  } else {
    node.childNodes.length > 0 && node.childNodes.forEach((node: IData) => getLeafNodes(node, leafNodeArr))
  }
}

// 获取目录及其子节点
export function getSelfAndChildNodes(node: IData, nodeArr: IData[]) {
  nodeArr.push(node)
  node.childNodes.length > 0 && node.childNodes.forEach((node: IData) => getSelfAndChildNodes(node, nodeArr))
}