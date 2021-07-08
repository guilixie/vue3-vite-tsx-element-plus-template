import type { IData } from '@/app'
import { defineComponent, EmitsOptions, SetupContext } from 'vue'
import ConfigForm from '@/components/config-form'
import Dialog from '@/components/dialog'
import useAddDialog from '../../services/useAddDialog'

export default defineComponent({
  name: 'AddManuDialog',
  inheritAttrs: false,
  props: {
    isUpdate: Boolean,
    formData: Object,
    visible: Boolean,
    setVisible: Function
  },
  setup: (props: Readonly<IData>, ctx: SetupContext<EmitsOptions>) => {
    const { form, options, rules, confirm, getTitle } = useAddDialog(props)

    const closeDialog = () => props.setVisible(false)

    const DialogBody = () => <ConfigForm options={options} form={form} rules={rules}></ConfigForm>

    return () => <Dialog
      { ...ctx.attrs } 
      title={getTitle()}
      width="30%"
      model-value={props.visible} 
      onUpdate:modelValue={closeDialog}
      onConfirm={confirm}
    >
      { DialogBody }
    </Dialog>
  }
})