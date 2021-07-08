import type { IData } from '@/app'
import { ref, Ref, watch } from 'vue'

type TCheckOption = {
  data: Ref<IData[]>,
  TRUE_LABEL?: any,
  FALSE_LABEL?: any,
  statusProp?: string,
}

export default function ({
  data = ref([]),
  TRUE_LABEL = 1,
  FALSE_LABEL = 0,
  statusProp = 'status'
}: TCheckOption): IData {
  // 全选
  const allChecked: Ref<boolean> = ref(false)

  // 检测是否全选
  function judgeCheckedAll(): void {
    const checkedData = data.value.filter((item) => item[statusProp] === TRUE_LABEL)
    allChecked.value = checkedData.length === data.value.length
  }

  // 改变是否启用
  function changeAllStatus(status: any): void {
    data.value.forEach((item) => {
      if (item[statusProp] !== status) {
        item[statusProp] = status
      }
    })
  }
  // 全选
  function checkAll() {
    changeAllStatus(TRUE_LABEL)
  }
  // 全不选 
  function uncheckAll() {
    changeAllStatus(FALSE_LABEL)
  }


  watch(allChecked, (newVal) => {
    if (newVal) {
      checkAll()
    } else {
      uncheckAll()
    }
  })

  return {
    TRUE_LABEL,
    FALSE_LABEL,
    allChecked,
    judgeCheckedAll,
    checkAll,
    uncheckAll,
  }
}