<template>
  <Tabs :value="type" size="small">
      <TabPane label="我发出的" name="create_user">
        <comments :comments="comments"></comments>
      </TabPane>
      <TabPane label="我收到的" name="to_user">
        <comments :comments="comments"></comments>
      </TabPane>
  </Tabs>
  
</template>
<script>
import comments from './components/commentsForUser'
export default {
  components: {
    comments
  },
  data () {
      return {
          type: 'create_user',
          comments: [],
          pageSize: 10,
          page: 1,
          total: 0
      }
  },
  mounted () {
    this.getCommentList()
  },
  methods: {
    getCommentList () {
      this.Common.axios('/api/comment/getusercommentlist', { type: this.typoe, page: this.page, pageSize: this.pageSize }).then(res => {
        if (res.data.code === 'OK') {
          this.comments = res.data.data.result
          this.total = res.data.data.total
        }
      })
    }
  }
}
</script>
