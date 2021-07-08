import type { IData } from '@/app'
import { noimpl } from '@/utils'
import { Ref, ref } from 'vue'

export default function (): IData {
  // 树的数据
  const data = [
    {
      id: 4,
      pid: null,
      name: "杭州市",
      children: [
        {
          id: 6,
          pid: 4,
          name: "萧山区",
          children: [
            {
              id: 1,
              pid: 6,
              name: "宁围街道"
            },
            {
              id: 3,
              pid: 6,
              name: "北干街道"
            }
          ],
        },
        {
          id: 10,
          pid: 4,
          name: "滨江区",
          children: [
            {
              id: 4,
              pid: 10,
              name: "长河街道"
            },
            {
              id: 5,
              pid: 6,
              name: "浦沿街道"
            }
          ],
        }
      ],
    },
    {
      id: 5,
      pid: null,
      name: "衢州市",
      children: [
        {
          id: 7,
          pid: 5,
          name: "衢江区",
          children: [
            {
              id: 2,
              pid: 7,
              name: "樟潭街道"
            }
          ],
        },
        {
          id: 9,
          pid: 5,
          name: "柯城区",
          children: [
            {
              id: 7,
              pid: 9,
              name: "巨化街道"
            }
          ],
        },
      ],
    },
    { id: 11, pid: null, name: "丽水市" },
  ]
  
  const dataProps = {
    label: 'name',
    parentId: 'pid'
  }

  const searchVal: Ref<string> = ref('')

  const handleNodeDelete = ({ data, node }: { data: IData, node: IData }) => {
    console.log('handleNodeDelete', node, data)
    // const isAlg = !data.is // 是否算法
    // const infoMap = {
    //   true: '此操作将解除算法与所在目录的绑定关系, 是否继续?',
    //   false: '此操作将永久删除当前目录，是否继续?'
    // }
    // const nodes = []
    // // 递归获取本身和子代节点
    // getSelfAndChildNodes(node, nodes)
    // // 获取本身和子代是否有算法节点
    // const hasAlgNodes = nodes.filter((node) => !node.data.is).length > 0
    // // 判断目录是否可删除,不是算法
    // if (!isAlg && hasAlgNodes) {
    //   this.$message({
    //     type: 'warning',
    //     message: '无法删除，当前目录或子目录已绑定了算法！'
    //   })
    //   return
    // }
    // //判断有子目录的父目录不能删除，子目录可以删
    // else if (node.data.pid == null && node.data.children.length > 0) {
    //   this.$message({
    //     type: 'warning',
    //     message: '无法删除，请先删除子目录！'
    //   })
    //   return
    // }
    // // 删除或解除绑定前确认下
    // this.$confirm(infoMap[isAlg], '提示', {
    //   confirmButtonText: '确定',
    //   cancelButtonText: '取消',
    //   type: 'warning'
    // })
    //   .then(() => (isAlg ? this.unbindAlg(data) : this.delCate(data.id))) // 判断删除目录还是解除算法绑定
    //   .catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消操作'
    //     })
    //   })
    noimpl()
  }

  const handleNodeSave = ({ oldData, data }: { oldData: IData, data: IData }, next: () => void) => {
    console.log('handleNodeSave', oldData, data)
    // const isUpdate = !!oldData
    // const json = {
    //   name: data.name,
    //   pid: data.pid
    // }
    // if (isUpdate) {
    //   json.id = data.id
    // }
    // this.editCate(json, next)
    noimpl()
  }

  return {
    dataProps, 
    data, 
    searchVal, 
    handleNodeDelete, 
    handleNodeSave
  }
}