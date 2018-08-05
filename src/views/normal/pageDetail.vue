<template>
  <div>
    <transition name="fade">
      <article v-if="page.title">
        <header>
          <h1 class="page-title">{{ page.title }}</h1>
          <div class="page-info">
            <!-- <span v-if="page.create_date!==page.update_date" class="update-time">更新于
              <time>{{ page.update_date.substring(0,10) }}</time>
              &nbsp;|&nbsp;
            </span> -->
            <span class="update-time">创建于
              <time>{{ page.create_date.substring(0,10) }}</time>
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
                <router-link :to="{ name: 'normalTagDetail', params: { name:  tag} }">
                  <span class="tag-span">{{ tag }}</span>
                </router-link>
                <span v-if="i<page.tags.length-1">,</span>
              </template>
              &nbsp;|&nbsp;
            </span>
            <span class="edit-span" v-if="Cookies.get('user')===page.create_user">
              <router-link :to="{name: 'editPage', params: {id: id}}">编辑</router-link>
            </span>
            <!-- <span>&nbsp;|&nbsp;</span> -->
          </div>
        </header>
        <div class="page-body" v-html="marked(page.content)"></div>
      </article>
    </transition>
    <transition name="fade">
      <div v-if="comments.length">
        <comments :comments="comments"></comments>
        <div>
          <p :style="{ fontSize: '20px' }">留言：</p>
          <Input type="textarea" :style="{ marginTop: '15px' }" v-model.trim="comment.content" :rows="6"></Input>
          <Button type="primary" :style="{ marginTop: '15px'}" @click="submitComment">发表</Button>
        </div>
      </div>
    </transition>
  </div>

</template>
<script>
import comments from './components/commentsForPage'
export default {
  components: { comments },
  data() {
    return {
      id: this.$route.params.id,
      user: this.Cookies.get('user'),
      page: {
        title: '',
        create_user: '',
        create_date: '',
        update_date: '',
        content: ''
      },
      comments: [],
      comment: {
        content: ''
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
        if (res.data.code === 'OK') {
          this.page = res.data.data
          this.$nextTick(() => {
            this.hljs.highlightCode()
          })
        }
      })
    },
    getComments () {
      this.Common.axios('/api/comment/getpagecommentlist', { page_id: this.id }).then(res => {
        if (res.data.code === 'OK') {
          this.comments = res.data.data.map(comment => { 
            comment.create_time = this.Common.dateFmt('yyyy-MM-dd hh:mm:ss', new Date(comment.create_time))
            return comment
          })
        } else {
          this.$Message.error(res.data.data)
        }
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
      this.Common.axios('/api/comment/create', this.comment).then(res => {
        if (res.data.code === 'OK') {
          this.comment.content = ''
          this.$Message.success('留言成功')
          this.getComments()
        } else {
          this.$Message.error(res.data.data)
        }
        
      })
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
    font-size: 14px;
  }
  margin-bottom: 120px;
}
</style>
