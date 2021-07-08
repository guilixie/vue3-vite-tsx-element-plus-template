import { IData } from '@/app'
import { ref, Ref, watchEffect } from 'vue'
import {
  RouteLocationNormalizedLoaded,
  RouteRecordRaw,
  useRoute,
} from 'vue-router'

export default function useBreadcrumb(): IData {
  const route: RouteLocationNormalizedLoaded = useRoute()

  let breadcrumbs: Ref<string[]> = ref([])

  watchEffect((): void => {
    breadcrumbs.value = getBreadcrumb(route)
  })

  function getBreadcrumb(route: RouteLocationNormalizedLoaded): string[] {
    // console.log(route.matched)
    const topRoute = route.matched.slice(0, 1)[0]
    // 一个孩子的话，如果这个孩子没有孩子，那么也不用显示，直接显示父级
    if (topRoute?.children?.length <= 1 && !topRoute?.children[0]?.children?.length) {
      return [topRoute.meta?.title as string]
    }
    return route.matched.reduce((acc: string[], rt: RouteRecordRaw): string[] => {
      return rt.name && rt.meta?.title
        ? acc.concat(rt.meta.title as string | string[])
        : acc
    }, [])
  }

  return { breadcrumbs }
}
