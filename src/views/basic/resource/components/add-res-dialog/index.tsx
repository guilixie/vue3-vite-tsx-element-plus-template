import type { IData } from '@/app'
import { defineComponent, EmitsOptions, provide, SetupContext } from 'vue'
import Dialog from '@/components/dialog'
import ResInfo from './ResInfo'
import StreetSelect from './StreetSelect'
import ResDistribute from './ResDistribute'
import useAddDialog from '../../services/useAddDialog'
import styles from '../../styles/AddDialog.module.scss'

export default defineComponent({
  name: 'AddResDialog',
  inheritAttrs: false,
  props: {
    isUpdate: Boolean,
    formData: Object,
    visible: Boolean,
    setVisible: Function
  },
  setup: (props: Readonly<IData>, ctx: SetupContext<EmitsOptions>) => {
    const { form, confirm, getTitle } = useAddDialog(props)
    
    // 提供给子孙组件使用的状态
    provide('form', form)

    const closeDialog = () => props.setVisible(false)

    const DialogBody = () => <el-row gutter={20}>
      <el-col span={24}>
        <ResInfo></ResInfo>
      </el-col>
      <el-col span={13}>
        <StreetSelect></StreetSelect>
      </el-col>
      <el-col span={11}>
        <ResDistribute></ResDistribute>
      </el-col>
    </el-row>

    const DialogFooter = () => <div class="app-dialog-footer" style="text-align:right;">
      <el-button type="primary" onClick={confirm}>提 交</el-button>
      <el-button onClick={closeDialog}>取 消</el-button>
    </div>

    return () => <Dialog 
      { ...ctx.attrs } 
      title={getTitle()}
      fullscreen 
      custom-class={styles.addResDialogContainer}
      model-value={props.visible} 
      onUpdate:modelValue={closeDialog}
    >
      {
        {
          default: DialogBody,
          footer: DialogFooter
        }
      }
    </Dialog>
  }
})