<template>
<div>
  <one-page v-for="(page, i) in page_list" :key="i" :page="page"></one-page>
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
          page_list: []
      }
  },
  mounted () {
    this.Common.axios('/api/page/pagelist', {}).then(res => {
      if (res.data.code === 'OK') {
        this.page_list = res.data.data
      }
    })
    this.$nextTick(() => {
      this.hljs.highlightCode()
    })
  }
}
</script>

