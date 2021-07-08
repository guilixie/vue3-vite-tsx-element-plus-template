import { EFormItemType, IData, IFormItem } from '@/app'
import useForm from '@/services/useForm'
import { noimpl } from '@/utils'
import { STATUS_SELECTIONS } from '@/utils/constant'
import { watch } from 'vue'

export default function (props: Readonly<IData>) {
  // 生成默认表单数据
  const formFactory = () => ({
    id: '',
    name: '',
    identifyType: '',
    manufacturer: '',
    type: '',
    serverUrl: '',
    asyncPower: 0,
    status: 1
  })

  const { form, mergeForm, resetForm } = useForm(formFactory)

  // 验证规则
  const rules = {}

  // 表单配置
  const options: IFormItem[] = [{
    type: EFormItemType.INPUT,
    prop: 'id',
    label: '算法包ID',
    placeholder: '请输入算法包ID'
  }, {
    type: EFormItemType.INPUT,
    prop: 'name',
    label: '算法包名称',
    placeholder: '请输入算法包名称'
  }, {
    type: EFormItemType.RADIO,
    prop: 'identifyType',
    label: '识别方式',
    selections: [{
      value: '1',
      label: '视频流识别'
    }, {
      value: '2',
      label: '视频图像识别'
    }, {
      value: '3',
      label: '手机照片识别'
    }]
  }, {
    type: EFormItemType.SELECT,
    prop: 'manufacturer',
    label: '厂商',
    selections: [{
      value: '1',
      label: '城云'
    }, {
      value: '2',
      label: '大华'
    }, {
      value: '3',
      label: '海康'
    }]
  }, {
    type: EFormItemType.SELECT,
    prop: 'type',
    label: '算法类型',
    placeholder: '请选择算法类型',
    selections: [{
      value: '1',
      label: '人行道违停'
    }, {
      value: '2',
      label: '沿街晾晒'
    }, {
      value: '3',
      label: '流动摊贩'
    }, {
      value: '4',
      label: '河道漂浮物'
    }, {
      value: '5',
      label: '出店经营'
    }, {
      value: '6',
      label: '暴露垃圾'
    }, {
      value: '7',
      label: '城管犬类'
    }],
    multiple: true
  }, {
    type: EFormItemType.SELECT,
    prop: 'serverUrl',
    label: '服务地址',
    placeholder: '请选择服务地址',
    selections: [],
    multiple: true,
    filterable: true,
    allowCreate: true
  }, {
    type: EFormItemType.INPUTNUMBER,
    prop: 'asyncPower',
    label: '总并发能力',
    placeholder: '请输入',
    min: 0
  }, {
    type: EFormItemType.RADIO,
    prop: 'status',
    label: '是否启用',
    selections: STATUS_SELECTIONS || []
  }]

  const getTitle = () => props.isUpdate ? '修改算法包' : '新增算法包'

  const confirm = () => {
    console.log('保存', form)
    noimpl()
  }

  watch(() => props.visible, (newVal, oldVal) => {
    if (newVal && !oldVal) {
      // 判断是修改还是新增
      if (props.isUpdate) {
        mergeForm(props.formData)
      } else {
        resetForm()
      }
    }
  })

  return {
    form,
    rules,
    options,
    confirm,
    getTitle
  }
}