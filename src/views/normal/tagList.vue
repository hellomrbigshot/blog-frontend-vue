<template>
<div>
  分类
  <!-- <page v-for="(page, index) in pageList" :key="index"></page> -->
</div>
</template>
<script>
// import page from './components/page'
export default {
  components: {
    // page
  },
  data () {
      return {
          tagList: [],
          total: 0,
          page: 1,
          pageSize: 10
      }
  },
  mounted () {
    this.getTagList()
  },
  methods: {
    async getTagList () {
      try {
        let result = await this.Common.axios('/api/tag/taglist', { page: this.page, pageSize: this.pageSize })
        if (result.data.code === 'OK') {
          this.tagList = res.data.data.result
          this.total = res.data.data.total
        } else {
          this.$Message.error(res.data.data)
        }
      } catch (e) {

      }
      
    }
  }
}
</script>