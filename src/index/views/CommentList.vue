<template>
  <Tabs
    v-model="type"
    size="small"
  >
    <TabPane
      label="我收到的"
      name="to_user"
    >
      <comments
        :comments="comments"
        :type="type"
      />
      <Pagination
        v-if="total > pageSize"
        :total="total"
        style="margin-bottom: 20px;"
        @on-change="getCommentList"
      />
    </TabPane>
    <TabPane
      label="我发出的"
      name="create_user"
    >
      <comments
        :comments="comments"
        :type="type"
      />
      <Pagination
        v-if="total > pageSize"
        :total="total"
        style="margin-bottom: 20px;"
        @on-change="getCommentList"
      />
    </TabPane>
  </Tabs>
</template>
<script>
export default {
  components: {
    comments: () => import('index/components/CommentsForUser')
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
    async type (newVal, oldVal) {
      this.page = 1
      this.comments = []
      await this.getCommentList()
      await this.updateCommentStatus()
    }
  },
  async mounted () {
    await this.getCommentList()
    await this.updateCommentStatus()
  },
  methods: {
    getCommentList (page) {
      if (page) this.page = page
      const formData = {
        type: this.type,
        create_user: this.user,
        to_user: this.user,
        page: this.page,
        pageSize: this.pageSize
      }
      return this.Common.axios('/api/comment/getusercommentlist', formData).then(res => {
        this.comments = res.data.data.result
        this.total = res.data.data.total
      })
    },
    updateCommentStatus () {
      if (this.type === 'to_user' && this.comments.length > 0 && this.comments.some(comment => !comment.is_read)) {
        const ids = this.comments.map(comment => {
          if (!comment.is_read) return comment._id
        })
        return this.Common.axios('/api/comment/updatecommentstatus', { ids })
      }
    }
  }
}
</script>
