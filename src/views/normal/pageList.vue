<template>
  <div>
    <transition name="fade">
      <div v-if="page_list.length">
        <one-page
          v-for="(page, i) in page_list"
          :key="i"
          :page="page"
        />
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
      </div>
    </transition>
  </div>
</template>
<script>
import { bus } from '../../bus/index'
export default {
  components: {
    onePage: () => import('./components/onePage')
  },
  data() {
    return {
      page_list: [],
      show_page: false,
      pageSize: 10,
      page: 1,
      total: 0,
      username: this.$route.query.username
    }
  },
  mounted() {
    this.getPageList()
    bus.$on('searchPage', (keywords) => {
      this.searchPage(keywords)
    })
  },
  methods: {
    getPageList() {
      this.Common.axios('/api/page/pagelist', { type: '', status: 'normal', content: '', pageSize: this.pageSize, page: this.page, secret: false, sort: 'update_time' }).then(res => {
        this.page_list = res.data.data.result
        this.total = res.data.data.total
        this.show_page = true
      })
    },
    pageChange(page) {
      this.page = page
      this.getPageList()
      this.Common.bodyScrollTop()
    },
    searchPage(keywords) {
      this.Common.axios('/api/page/searchpage', { keywords }).then(res => {
        this.page_list = res.data.data.result
        this.total = 0
      })
    }
  }
}
</script>
