<template>
<div>
  <transition name="fade">
    <div v-if="page_list.length">
      <one-page v-if="page_list.length" v-for="(page, i) in page_list" :key="i" :page="page"></one-page>
      <div class="pagination">
        <new-page v-if="total>pageSize" :total="total" @on-change="pageChange"></new-page>
      </div>
    </div>
  </transition>
</div>
</template>
<script>
import onePage from './components/onePage'
import { bus } from '../../bus/index'
export default {
  components: {
    onePage
  },
  data () {
      return {
          page_list: [],
          show_page: false,
          pageSize: 10,
          page: 1,
          total: 0,
          username: this.$route.query.username
      }
  },
  mounted () {
    if (this.username) {
      this.Cookies.set('user', this.username)
    }
    this.getPageList()
    bus.$on('searchPage', (keywords) => {
      this.searchPage(keywords)
    })
    
  },
  methods: {
    getPageList () {
      this.Common.axios('/api/page/pagelist', { type: '', status: 'normal', content: '', pageSize: this.pageSize, page: this.page }).then(res => {
        if (res.data.code === 'OK') {
          this.page_list = res.data.data.result
          this.total = res.data.data.total
          this.$nextTick(() => {
            this.hljs.highlightCode()
          })
          this.show_page = true
        } else {
          this.$Message.error(res.data.data)
        }
      })
    },
    pageChange (page) {
      this.page = page
      this.getPageList()
    },
    searchPage (keywords) {
      this.Common.axios('/api/page/searchpage', { keywords }).then(res => {
        if (res.data.code === 'OK') {
          this.page_list = res.data.data.result
          this.total = 0
        } else {
          this.$Message.error(res.data.data)
        }
      })
    }
  }
}
</script>

