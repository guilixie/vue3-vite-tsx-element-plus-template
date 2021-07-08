import { defineComponent } from 'vue'

export default defineComponent({
  name: "Dialog",
  inheritAttrs: false,
  emits: ['update:modelValue', 'confirm'],
  // props: {},
  render() {
    const close = () => this.$emit('update:modelValue', false)

    const DialogFooter = () => <div class="app-dialog-footer">
      <el-button type="primary" onClick={() => this.$emit('confirm')}>确 定</el-button>
      <el-button onClick={close}>取 消</el-button>
    </div>

    const dialogSlots = {
      default: this.$slots.default,
      footer: this.$slots.footer || DialogFooter
    }

    return <el-dialog
      {...this.$attrs}
      v-slots={dialogSlots}
      onClose={close}
    ></el-dialog>
  }
})