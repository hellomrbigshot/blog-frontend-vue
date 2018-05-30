<template>
<div>
  <one-page v-for="(page, i) in page_list" :key="i" :page="page"></one-page>
  <div :style="{marginBottom: '50px'}">
    <new-page v-if="total>pageSize" :total="total" @on-change="pageChange"></new-page>
  </div>
</div>
</template>
<script>
import onePage from './components/onePage'
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
          total: 0
      }
  },
  mounted () {
    this.getPageList()
    
  },
  methods: {
    getPageList () {
      this.Common.axios('/api/page/pagelist', { type: '', status: 'normal', content: '', pageSize: this.pageSize, page: this.page }).then(res => {
        if (res.data.code === 'OK') {
          this.page_list = res.data.data.result
          this.pageAmount = res.data.data.total
          this.$nextTick(() => {
            this.hljs.highlightCode()
          })
          this.show_page = true
        }
      })
    },
    pageChange (page) {
      this.page = page
      this.getPageList()
    }
  }
}
</script>

