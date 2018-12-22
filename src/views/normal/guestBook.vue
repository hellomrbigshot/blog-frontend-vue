<template>
  <Tabs v-model="type" size="small">
    <TabPane label="我收到的" name="to_user">
      <comments :comments="comments" :type="type"></comments>
      <new-page v-if="total > pageSize" :total="total" @on-change="getCommentList"  style="margin-bottom: 20px;"></new-page>
    </TabPane>
    <TabPane label="我发出的" name="create_user">
      <comments :comments="comments" :type="type"></comments>
      <new-page v-if="total > pageSize" :total="total" @on-change="getCommentList" style="margin-bottom: 20px;"></new-page>
    </TabPane>
  </Tabs>
  
</template>
<script>
export default {
  components: {
    comments: () => import('./components/commentsForUser')
  },
  data () {
      return {
          type: 'to_user',
          user: this.Cookies.get('user'),
          comments: [],
          pageSize: 10,
          page: 1,
          total: 0
      }
  },
  watch: {
    type (newVal, oldVal) {
      this.page = 1
      this.comments = []
      this.getCommentList()
    }
  },
  mounted () {
    this.getCommentList()
  },
  methods: {
    getCommentList (page) {
      if (page) this.page = page;
      let query_obj = {
        type: this.type,
        create_user: this.user,
        to_user: this.user,   
        page: this.page, 
        pageSize: this.pageSize
      }
      this.Common.axios('/api/comment/getusercommentlist', query_obj).then(res => {
        this.comments = res.data.data.result.map(comment => { 
          comment.create_time = this.Common.dateFmt('yyyy-MM-dd hh:mm:ss', new Date(comment.create_time))
          return comment
        })
        this.total = res.data.data.total
      })
    },
  }
}
</script>
