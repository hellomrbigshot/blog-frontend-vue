<template>
  <div>
    <transition name="slide-fade">
      <article v-if="show_detail">
        <header>
          <h1 class="page-title">{{ page.title }}</h1>
          <div class="page-info">
            <span v-if="Common.formatTime(page.update_time, '3')!==Common.formatTime(page.create_time, '3')" class="update-time">更新于
              <time>{{ Common.formatTime(page.update_time, '3') }}</time>
              &nbsp;|&nbsp;
            </span>
            <span class="update-time">创建于
              <time>{{ Common.formatTime(page.create_time, '3') }}</time>
              &nbsp;|&nbsp;
            </span>
            <span class="create-user">作者
              <router-link :to="{ name: 'userDetail', params: { username:  page.create_user }}">
                <span class="user-span">{{ page.create_user }}</span>
              </router-link>
              &nbsp;|&nbsp;
            </span>
            <span class="create-user">标签
              <template v-for="(tag, i) in page.tags">
                <router-link :to="{ name: 'normalTagDetail', params: { name:  tag} }" :key="`${i}router`">
                  <span class="tag-span">{{ tag }}</span>
                </router-link>
                <span v-if="i<page.tags.length-1" :key="`${i}span`">,</span>
              </template>
              &nbsp;|&nbsp;
            </span>
            <span class="edit-span" v-if="Cookies.get('user')===page.create_user">
              <router-link :to="{name: 'editPage', params: {id: id}}">编辑</router-link>
            </span>
            <!-- <span>&nbsp;|&nbsp;</span> -->
          </div>
        </header>
        <div class="page-body m-editor-preview" v-html="marked(page.content)"></div>
      </article>
    </transition>
    <transition name="fade">
      <div v-if="show_detail">
        <comments :comments="comments" @on-reply="replyComment"></comments>
      </div>
    </transition>
    <div style="margin-bottom: 20px;" v-show="show_detail">
      <p :style="{ fontSize: '20px', marginBottom: '15px' }">留言：</p>
      <Tag closable v-show="comment.reply_user" @on-close="removeReplyUser" :style="{ marginBottom: '10px' }">回复{{ comment.reply_user }}</Tag>
      <Input id="commentInput" type="textarea" ref="commentInput" v-model.trim="comment.content" :rows="6" />
      <Button type="primary" :style="{ marginTop: '15px'}" @click="submitComment">发表</Button>
    </div>
  </div>

</template>
<script>
export default {
  components: { 
    comments: () => import('./components/commentsForPage')
   },
  data() {
    return {
      id: this.$route.params.id,
      user: this.Cookies.get('user'),
      show_detail: false,
      page: {
        title: '',
        create_user: '',
        create_time: '',
        update_time: '',
        content: ''
      },
      comments: [],
      comment: {
        content: '',
        reply_user: '',
        reply_content: ''
      }
    }
  },
  mounted() {
    this.getPageDetail()
    this.getComments()
  },
  methods: {
    getPageDetail() {
      this.Common.axios('/api/page/detail', { id: this.id }).then(res => {
        this.page = res.data.data
        this.show_detail = true
      })
    },
    getComments () {
      this.Common.axios('/api/comment/getpagecommentlist', { page_id: this.id }).then(res => {
        this.comments = res.data.data.map(comment => { 
          comment.create_time = this.Common.dateFmt('yyyy-MM-dd hh:mm:ss', new Date(comment.create_time))
          return comment
        })
      })
    },
    submitComment() {
      if (!this.user) {
        // 如果没有登录就跳转到登录页
        this.$router.push({
          name: 'login',
          query: { redirect: this.$route.fullPath }
        })
      }
      if (!this.comment.content) {
        this.$Message.warning('留言不能为空！')
        return false
      }
      this.comment.page_title = this.page.title
      this.comment.page_id = this.id
      this.comment.create_user = this.user
      this.comment.to_user = this.page.create_user
      this.Common.axios('/api/comment/create', this.comment).then(res => {
        this.comment.content = ''
        this.comment.reply_user = ''
        this.comment.reply_content = ''
        this.$Message.success('留言成功')
        this.getComments()
      })
    },
    replyComment (user, content) {
      this.comment.reply_user = user
      this.comment.reply_content = content
      this.$refs['commentInput'].focus()
    },
    removeReplyUser () {
      this.comment.reply_user = ''
      this.comment.reply_content = ''
    }
  }
}
</script>
<style lang="scss" scoped>
article {
  width: 700px;
  margin: 0 auto;
  @media screen and (min-width: 1600px) {
    width: 900px;
  }
  @media screen and (max-width: 767px) {
    width: auto;
  }
  header {
    font-family: Lato, 'PingFang SC', 'Microsoft YaHei', sans-serif;
    .page-title {
      font-weight: 400;
      font-size: 26px;
      margin: 20px 0 10px;
      color: #555;
      text-align: center;
    }
    .page-info {
      color: #999;
      font-size: 12px;
      margin: 0 0 20px;
      text-align: center;
      a {
        color: #555;
        border-bottom: 1px solid #ccc;
        &:hover {
          color: #222;
          border-bottom-color: #222;
        }
      }
    }
  }
  .page-body {
    line-height: 2!important;
    font-size: 15px;
  }
  margin-bottom: 120px;
}
</style>
