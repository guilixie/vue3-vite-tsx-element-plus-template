import type { IData } from '@/app'
import { computed, EmitsOptions, nextTick, ref, Ref, SetupContext, watchEffect } from 'vue'
import { getIndex } from './utils'

export default function useTableView(props: Readonly<IData>, ctx: SetupContext<EmitsOptions>) {
  let isUpdateSelected = false

  const tableRef: Ref<null | any> = ref(null)

  const selectedIdx = computed((): number | undefined => {
    // console.log('selectedIdx', props.selected)
    const data: IData[] = ctx.attrs.data as IData[]
    for (let i = 0; i < data.length; i++) {
      if (Object.is(props.selected[0], data[i])) {
        return genIndex(i)
      }
    }
  })

  watchEffect(async () => {
    if (isUpdateSelected) return
    const selectedData = props.selected
    // console.log('setSelected', selectedData)     
    await nextTick()
    selectedData.forEach((row: IData) => {
      tableRef.value.toggleRowSelection(row, true)
    })
  })

  const genIndex: (index: number) => number = (index) => getIndex(index, props.pager)

  const updateSelectedDebounce = async (selected: IData[]): Promise<void> => {
    isUpdateSelected = true
    await ctx.emit('update:selected', selected)
    isUpdateSelected = false
  }

  const handleCurrentChange = async (row: IData): Promise<void> => {
    // console.log('handleCurrentChange', row)
    await updateSelectedDebounce([row])
  }

  const handleSelectionChange = async (selection: IData[]): Promise<void> => {
    // console.log('handleSelectionChange', selection)
    await updateSelectedDebounce(selection)
  }

  return {
    tableRef,
    selectedIdx,
    genIndex,
    handleCurrentChange,
    handleSelectionChange,
  }
}
