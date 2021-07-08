import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: "Pagination",
  inheritAttrs: false,
  emits: ['paging'],
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    total: {
      type: Number,
      default: 0,
    },
    pageSizes: {
      type: Array as PropType<number[]>,
      default: (): number[] => [10, 20, 30, 40, 50, 100, 200],
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper',
    },
    small: {
      type: Boolean,
      default: false
    }
  },
  render() {
    return <div class="app-pager-container">
      <el-pagination onSizeChange={(pageSize: number) => this.$emit('paging', { pageSize })}
        onCurrentChange={(currentPage: number) => this.$emit('paging', { currentPage })}
        currentPage={this.currentPage}
        pageSizes={this.pageSizes}
        pageSize={this.pageSize}
        layout={this.layout}
        total={this.total}
        small={this.small}
        background={true}>
      </el-pagination>
    </div>
  }
})