<template>
  <Page
    :current="current"
    :total="total"
    :page-size="pageSize"
    :page-size-opts="pageSizeOpts"
    :placement="placement"
    :size="size"
    :simple="simple"
    :show-total="showTotal"
    :show-elevator="showElevator"
    :show-sizer="showSizer"
    :class-name="className"
    :styles="styles"
    :transfer="transfer"
    @on-change="pageChange"
    @on-page-size-change="pageSizeChange"
  />
</template>
<script>
export default {
  props: {
    current: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageSizeOpts: {
      type: Array,
      default () {
        return [10, 20, 30, 40]
      }
    },
    placement: {
      default: 'bottom'
    },
    transfer: {
      type: Boolean,
      default: false
    },
    size: {
      type: String
    },
    simple: {
      type: Boolean,
      default: false
    },
    showTotal: {
      type: Boolean,
      default: false
    },
    showElevator: {
      type: Boolean,
      default: false
    },
    showSizer: {
      type: Boolean,
      default: false
    },
    className: {
      type: String
    },
    styles: {
      type: Object
    }
  },
  methods: {
    pageChange (page) {
      this.$emit('on-change', page)
    },
    pageSizeChange (pageSize) {
      this.$emit('on-page-size-change', pageSize)
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ .ivu-page-prev, /deep/ .ivu-page-next, /deep/ .ivu-page-item-active, /deep/ .ivu-page-item {
    border: none;
  }
/deep/ .ivu-page-item-active {
    // background: #ccc;
  }
</style>
