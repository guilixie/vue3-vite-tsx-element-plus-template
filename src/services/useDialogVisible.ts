import { ref, Ref } from 'vue'

export default function useDialogVisible() {
  // 弹窗打开关闭相关
  const visible: Ref<boolean> = ref(false)

  function setVisible(val: boolean): void {
    visible.value = val
  }

  return {
    visible,
    setVisible
  }
}