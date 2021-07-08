import type { IData } from '@/app'
import { computed, EmitsOptions, reactive, Ref, SetupContext, watchEffect } from 'vue'
import useCheck from './useCheck'

export default function useTreeTransfer(props: Readonly<IData>, ctx: SetupContext<EmitsOptions>) {

  const dataStore: {
    left: IData[],
    right: IData[]
  } = reactive({
    left: [],
    right: []
  })

  const { checkedKeys, halfCheckedKeys, transferNodes, filterLeaves } = useCheck(props)

  const buttonDisableds: Ref<boolean[]> = computed(() => {
    return [!checkedKeys.right || !checkedKeys.right.length, !checkedKeys.left || !checkedKeys.left.length]
  })

  const emitData = () => {
    ctx.emit('update:data', [...dataStore.left])
    ctx.emit('update:modelValue', [...dataStore.right])
  }

  // 去除一级叶子
  const filterFirstLeaves = () => {
    dataStore.right = filterLeaves(dataStore.right)
    dataStore.left = filterLeaves(dataStore.left)
  }

  const handleTransferLeft = () => {
    transferNodes(dataStore.right, dataStore.left, checkedKeys.right, halfCheckedKeys.right)
    filterFirstLeaves()
    checkedKeys.right = []
    halfCheckedKeys.right = []
    emitData()
  }

  const handleTransferRight = () => {
    transferNodes(dataStore.left, dataStore.right, checkedKeys.left, halfCheckedKeys.left)
    filterFirstLeaves()
    checkedKeys.left = []
    halfCheckedKeys.left = []
    emitData()
  }

  watchEffect(() => {
    dataStore.left = props.data
    dataStore.right = props.modelValue
    checkedKeys.left = props.leftDefaultChecked
    checkedKeys.right = props.rightDefaultChecked
    halfCheckedKeys.left = props.leftDefaultHalfChecked
    halfCheckedKeys.right = props.rightDefaultHalfChecked
    filterFirstLeaves()
  })

  return {
    dataStore,
    checkedKeys,
    halfCheckedKeys,
    buttonDisableds,
    handleTransferLeft,
    handleTransferRight
  }
}
