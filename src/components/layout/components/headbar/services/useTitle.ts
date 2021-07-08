import { Ref, ref } from 'vue'
import type { IData } from '@/app'
import { appConfig } from '@/router'

export default function useTitles(): IData {
  let title: Ref<string> = ref('')

  function setAppTitle(label: string): void {
    title.value = label
    window.document.title = label
  }

  setAppTitle(appConfig.label)

  return {
    title,
  }
}
