<template>
  <section>
    <div class="tag-title">
      <h2>
        {{ name }}
        <small>标签</small>
      </h2>
      <div class="tag-desc">{{ detail.description }}</div>
    </div>
    <page-list :page-list="pageList" />
    <div
      class="pagination"
      style="margin-bottom: 20px;"
    >
      <Pagination
        v-if="total > pageSize"
        :total="total"
        @on-change="pageChange"
      />
    </div>
  </section>
</template>

<script>
import pageList from './components/pageList'
export default {
  components: {
    pageList
  },
  data() {
    return {
      name: this.$route.params.name,
      page: 1,
      pageSize: 10,
      total: 0,
      detail: {

      },
      pageList: []
    }
  },
  mounted() {
    this.getTagDetail()
    this.getPageList()
  },
  methods: {
    getPageList() {
      this.Common.axios('/api/page/pagelist', {
        type: 'tag',
        content: this.name,
        page: this.page,
        pageSize: this.pageSize,
        status: 'normal',
        secret: false
      }).then(res => {
        this.pageList = res.data.data.result
        this.total = res.data.data.total
      })
    },
    getTagDetail() {
      this.Common.axios('/api/tag/tagdetail', { name: this.name })
        .then(res => {
          this.detail = res.data.data
        })
    },
    pageChange(page) {
      this.page = page
      this.getPageList()
    }
  }
}
</script>

<style lang="scss" scoped>
.tag-title {
  margin: 60px 0;
  position: relative;
  h2 {
    margin: 20px 0 10px 20px;
    font-size: 22px;
    color: #555;
    small {
      color: #bbb;
    }
  }
  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 16px;
    width: 8px;
    height: 8px;
    margin-left: -4px;
    background: #bbb;
    border-radius: 50%;
  }
  .tag-desc {
    margin-left: 20px;
    font-size: 12px;
  }
}
</style>
