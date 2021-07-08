import { isFunction, isUndef } from '@/utils'

export const judgeVal: (val: boolean | (() => boolean) | any, defaultVal?: boolean) => boolean =
  (val, defaultVal = false) => isUndef(val) ? defaultVal : isFunction(val) ? val() : val