<template>
  <div>
    <transition name="fade">
      <div v-if="pageList.length">
        <one-page
          v-for="(page, i) in pageList"
          :key="i"
          :page="page"
        />
        <div
          style="margin-bottom: 20px;"
        >
          <Page
            v-if="total > pageSize && showPage"
            :total="total"
            size="small"
            @on-change="pageChange"
          />
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { bus } from '@/bus/index'
export default {
  components: {
    onePage: () => import('index/components/OnePage')
  },
  data () {
    return {
      pageList: [],
      showPage: false,
      pageSize: 10,
      page: 1,
      total: 0
    }
  },
  mounted () {
    this.getPageList()
    bus.$on('searchPage', (keywords) => {
      this.searchPage(keywords)
    })
  },
  methods: {
    getPageList () {
      this.Common.axios('/api/page/pagelist', { type: '', status: 'normal', content: '', pageSize: this.pageSize, page: this.page, secret: false, sort: 'update_time' }).then(res => {
        this.pageList = res.data.data.result
        this.total = res.data.data.total
        this.showPage = true
      })
    },
    pageChange (page) {
      this.page = page
      this.getPageList()
      this.Common.bodyScrollTop()
    },
    searchPage (keywords) {
      this.Common.axios('/api/page/searchpage', { keywords }).then(res => {
        this.pageList = res.data.data.result
        this.total = 0
      })
    }
  }
}
</script>
