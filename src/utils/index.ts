import { IData, ISelection } from '@/app'
import { ElMessage, ElMessageBox } from 'element-plus'
import req from './req'

export const noop = (): void => { }

export const noimpl = () => ElMessage({ message: '该功能还在建设中...', center: true })

export const isUndef = (val: any): boolean => val === undefined || val === null

export const isDef = (val: any): boolean => val !== undefined && val !== null
// 是否函数
export const isFunction = (val: any): boolean => typeof val === 'function'

// 是否数组
export function isArray(data: unknown) {
  if (!Array.isArray) {
    return getType(data) === 'array'
  }
  return Array.isArray(data)
}

// 是否纯粹对象
export function isPlainObject(data: any) {
  return getType(data) === 'object'
}

// 数据类型
export function getType(val: any) {
  const typeArr: string[] = ['Boolean', 'Number', 'String', 'Function', 'Array', 'Date', 'RegExp', 'Object']
  const class2type: string[] = []
  typeArr.forEach((v: string) => {
    class2type[`[object ${v}]`] = v.toLowerCase()
  })
  return val == null ? String(val) : class2type[{}.toString.call(val)] || 'object'
}

// 时间格式化
export function formatDate(d: any, fmt: string) {
  /**
   * 对Date的扩展，将 Date 转化为指定格式的String
   * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)可以用 1-2 个占位符
   * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
   * eg:
   * formatDate(new Date(),"yyyy-MM-dd hh:mm:ss.S")==> 2018-06-28 08:09:04.423
   * formatDate(new Date(),"yyyy-MM-dd E HH:mm:ss") ==> 2018-06-28 二 20:09:04
   * formatDate(new Date(),"yyyy-MM-dd EE hh:mm:ss") ==> 2018-06-28 周二 08:09:04
   * formatDate(new Date(),"yyyy-MM-dd EEE hh:mm:ss") ==> 2018-06-28 星期二 08:09:04
   * formatDate(new Date(),"yyyy-M-d h:m:s.S") ==> 2018-6-2 8:9:4.18
   */
  const date = new Date(d)
  const o = {
    'M+': date.getMonth() + 1, //月份
    'd+': date.getDate(), //日
    'D+': date.getDate(), //日
    'h+': date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, //小时
    'H+': date.getHours(), //小时
    'm+': date.getMinutes(), //分
    's+': date.getSeconds(), //秒
    'q+': Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds() //毫秒
  }
  const week = {
    '0': '/u65e5',
    '1': '/u4e00',
    '2': '/u4e8c',
    '3': '/u4e09',
    '4': '/u56db',
    '5': '/u4e94',
    '6': '/u516d'
  }
  if (/(y+)/.test(fmt) || /(Y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (RegExp.$1.length > 1 ? (RegExp.$1.length > 2 ? '/u661f/u671f' : '/u5468') : '') + week[date.getDay() + '']
    )
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return fmt
}
// 延迟执行
export const delayDo = (cb: () => any, sec: number = 0.5): (fn: () => any) => void => {
  let timer: any = setTimeout(cb, sec * 1000)
  const cancel = (fn: () => any): void => {
    clearTimeout(timer)
    timer = null
    fn?.()
  }
  return cancel
}
// guid
export const guid = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0
    const v = c == 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

// 数组去重
export const uniq = (arr: any[]) => {
  return Array.from(new Set(arr))
}

// 数组为空
export const isArrayEmpty = (arr: any[]) => {
  return arr.length === 0
}

// 深拷贝
export const cloneDeep = (val: object) => JSON.parse(JSON.stringify(val))

// 通过枚举（字符差串对应数字的枚举）生成选项
export const getSelectionsFromEnum: (x: IData) => ISelection[] = (enumData) => {
  const selections: ISelection[] = []
  for (let key in enumData) {
    // console.log(key, enumData[key])
    if (typeof enumData[key] === 'number') {
      selections.push({
        value: enumData[key],
        label: key
      })
    }
  }
  return selections
}

// 本页面下载
export function silentDownload(url: string) {
  const BODY = document.body
  const IFRAMEID = 'J_downloadIframe'
  const IFRAME = document.createElement('iframe')
  IFRAME.style.width = '0'
  IFRAME.style.height = '0'
  IFRAME.style.display = 'none'
  IFRAME.setAttribute('id', IFRAMEID)
  IFRAME.src = url
  BODY.appendChild(IFRAME)
  const timer = setTimeout(() => {
    const EL = document.getElementById(IFRAMEID)
    EL && BODY.removeChild(EL)
    clearTimeout(timer)
  }, 500)
}

// 下载文件
export function downGet(href: string, p: IData) {
  const params = []
  for (const item in p) {
    params.push(`${item}=${p[item]}`)
  }
  const url = params.length ? `${href}?${params.join('&')}` : `${href}`
  const iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  iframe.src = url
  iframe.onload = function () {
    document.body.removeChild(iframe)
  }
  document.body.appendChild(iframe)
}

// 直接调用封装的req, 下载文件
export function downloadFile(id: string | number) {
  return req.get(`/file/download/${id}`, {
    headers: {
      'Content-Type': 'application/octet-stream;charset=UTF-8'
    },
    timeout: 0,
    responseType: 'blob'
  })
}

// application/octet-stream文件下载获取文件名
export const getFileNameFormHeader = (disposition: string): string => {
  let result
  const reg = /filename=.*/ig
  if (disposition && reg.test(disposition)) {
    result = disposition.match(reg)
    return result ? decodeURI(result[0].split('=')[1].replace(/"/g, '')) : ''
  } else {
    return ''
  }
}

// 下载流
export const downloadByStream = (stream: any, filename: string) => {
  const blob = new Blob([stream])
  const eLink = document.createElement('a')
  eLink.download = filename
  eLink.style.display = 'none'
  eLink.href = URL.createObjectURL(blob)
  document.body.appendChild(eLink)
  eLink.click()
  URL.revokeObjectURL(eLink.href)
  document.body.removeChild(eLink)
}

// 小数转换成百分比
export const toPercent = (decimals: number, precision: number = 0) => {
  return decimals ? Number(decimals * 100).toFixed(precision) + '%' : '0%'
}

export const confirmDo = (msg: string, cancelMsg: string, doSomething: () => void | Promise<void>) => {
  ElMessageBox.confirm(msg, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(doSomething)
    .catch(
      () => ElMessage({
        type: 'info',
        message: cancelMsg
      })
    )
}

export const confirmDel = (doSomething: () => void | Promise<void>) => {
  confirmDo('确定删除？', '已取消删除', doSomething)
}