import type { IData } from '@/app'
import { confirmDo } from '@/utils'

type startOrStopProps = {
  doStart: (x: IData[] | any) => Promise<void> | void,
  doStop: (x: IData[] | any) => Promise<void> | void,
  startMessage?: string,
  stopMessage?: string
}

export default function useStartOrStop({
  doStart,
  doStop,
  startMessage = '此操作将永久启用所选记录, 是否继续?',
  stopMessage = '此操作将永久停用所选记录, 是否继续?'
}: startOrStopProps) {

  function start(val: IData[]): void {
    confirmDo(startMessage, '已取消启用', () => doStart?.(val))
  }

  function stop(val: IData[]): void {
    confirmDo(stopMessage, '已取消启用', () => doStop?.(val))
  }

  return {
    start,
    stop
  }
}