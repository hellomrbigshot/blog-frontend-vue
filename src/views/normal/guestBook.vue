<template>
  <Tabs :value="type" size="small">
      <TabPane label="我收到的" name="receive">

      </TabPane>
      <TabPane label="我发出的" name="send">标签二的内容</TabPane>
  </Tabs>
  
</template>
<script>
export default {
  data () {
      return {
          type: 'receive',
          pageSize: 10,
          page: 1,
          total: 0
      }
  },
  mounted () {

  },
  methods: {
    getCommentsList () {
      this.Common.axios('/api/user/comments', { type: '', page: this.page, pageSize: this.pageSize })
    }
  }
}
</script>
