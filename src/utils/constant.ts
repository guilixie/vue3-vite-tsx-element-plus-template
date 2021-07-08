import { getSelectionsFromEnum } from './index'

// 状态枚举
export enum STATUS_ENUM {
  停用 = 0,
  启用 = 1
}
// 状态选项
export const STATUS_SELECTIONS = getSelectionsFromEnum(STATUS_ENUM)