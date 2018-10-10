<template>
    <section style="position: relative">
        <detail-user-info></detail-user-info>
        <div class="user-page-list">
            <h1 :style="{ fontSize: '20px', color: '#555', fontWeight: '500' }">相关文章</h1>
            <page-list :page-list="pageList"></page-list>
        </div>
        <div class="pagination">
            <new-page :total="total" v-if="pageSize<total" @on-change="pageChange"></new-page>
        </div>
    </section>
</template>

<script>
import pageList from '../components/pageList'
import detailUserInfo from '../components/detailUserInfo'
export default {
  components: {
    pageList,
    detailUserInfo
  },
  data() {
    return {
      username: this.$route.params.username,
      total: 0,
      page: 1,
      pageSize: 10,
      pageList: [],
    }
  },
  mounted() {
    this.getPageList()
  },
  methods: {
    getPageList() {
      const post_data = {
        type: 'create_user',
        status: 'normal',
        content: this.username,
        pageSize: this.pageSize,
        page: this.page,
        secret: false
      }
      this.Common.axios('/api/page/pagelist', post_data).then(res => {
        this.pageList = res.data.data.result
        this.total = res.data.data.total
      })
    },
    pageChange (page) {
      this.page = page
      this.getPageList()
    }
  }
}
</script>
<style lang="scss" scoped>
.user-page-list {
    margin-top: 30px;
}
</style>