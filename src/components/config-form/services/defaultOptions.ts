import { EFormItemType, IData } from '@/app'
import FormDatePicker from '../components/FormDatePicker'
import FormDateRangePicker from '../components/FormDateRangePicker'
import FormInput from '../components/FormInput'
import FormTextarea from '../components/FormTextarea'
import FormInputNumber from '../components/FormInputNumber'
import FormSelect from '../components/FormSelect'
import FormRadio from '../components/FormRadio'
import FormCheckbox from '../components/FormCheckbox'
import FormCustom from '../components/FormCustom'
import FormTimePicker from '../components/FormTimePicker'
import FormTimeSelect from '../components/FormTimeSelect'
import FormTimeRangePicker from '../components/FormTimeRangePicker'
import FormTimeRangeSelect from '../components/FormTimeRangeSelect'

export const defaultRangeSeparator: string = '-'

export const placeholderMapping: IData = {
  [EFormItemType.DATE]: '选择日期',
  [EFormItemType.DATETIME]: '选择日期时间',
  [EFormItemType.TIME]: '选择时间',
  [EFormItemType.TIMESELECT]: '选择时间',
  [EFormItemType.DATES]: '选择一个或多个日期',
  [EFormItemType.YEAR]: '选择年',
  [EFormItemType.MONTH]: '选择月',
  [EFormItemType.WEEK]: '选择周',
}

export const startPlaceholderMapping: IData = {
  [EFormItemType.DATERANGE]: '开始日期',
  [EFormItemType.MONTHRANGE]: '开始月份',
  [EFormItemType.DATETIMERANGE]: '开始日期时间',
  [EFormItemType.TIMERANGE]: '开始时间',
  [EFormItemType.TIMESELECTRANGE]: '开始时间',
}

export const endPlaceholderMapping: IData = {
  [EFormItemType.DATERANGE]: '结束日期',
  [EFormItemType.MONTHRANGE]: '结束月份',
  [EFormItemType.DATETIMERANGE]: '结束日期时间',
  [EFormItemType.TIMERANGE]: '结束时间',
  [EFormItemType.TIMESELECTRANGE]: '结束时间',
}

export const typeCompMapping: IData = {
  [EFormItemType.INPUT]: FormInput,
  [EFormItemType.TEXTAREA]: FormTextarea,
  [EFormItemType.INPUTNUMBER]: FormInputNumber,
  [EFormItemType.CUSTOM]: FormCustom,
  [EFormItemType.RADIO]: FormRadio,
  [EFormItemType.CHECKBOX]: FormCheckbox,
  [EFormItemType.SELECT]: FormSelect,
  [EFormItemType.DATE]: FormDatePicker,
  [EFormItemType.DATES]: FormDatePicker,
  [EFormItemType.YEAR]: FormDatePicker,
  [EFormItemType.MONTH]: FormDatePicker,
  [EFormItemType.WEEK]: FormDatePicker,
  [EFormItemType.DATETIME]: FormDatePicker,
  [EFormItemType.TIME]: FormTimePicker,
  [EFormItemType.TIMESELECT]: FormTimeSelect,
  [EFormItemType.DATERANGE]: FormDateRangePicker,
  [EFormItemType.MONTHRANGE]: FormDateRangePicker,
  [EFormItemType.DATETIMERANGE]: FormDateRangePicker,
  [EFormItemType.TIMERANGE]: FormTimeRangePicker,
  [EFormItemType.TIMESELECTRANGE]: FormTimeRangeSelect
}

export const defaultFormatMapping: IData = {
  [EFormItemType.DATE]: 'YYYY-MM-DD',
  [EFormItemType.YEAR]: 'YYYY',
  [EFormItemType.MONTH]: 'MM',
  [EFormItemType.WEEK]: 'gggg 第 ww 周',
  [EFormItemType.DATETIME]: 'YYYY-MM-DD HH:mm:ss',
  [EFormItemType.DATERANGE]: 'YYYY-MM-DD',
  [EFormItemType.MONTHRANGE]: 'MM',
  [EFormItemType.DATETIMERANGE]: 'YYYY-MM-DD HH:mm:ss'
}