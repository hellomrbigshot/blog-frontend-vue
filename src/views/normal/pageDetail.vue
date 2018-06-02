<template>
    <div>
        <article>
            <header>
                <h1 class="page-title">{{ page.title }}</h1>
                <div class="page-info">
                    <!-- <span class="create-time">创建于
                        <time>{{ page.create_date.substring(0,10) }}</time>
                        &nbsp;|&nbsp;
                    </span> -->
                    <span v-if="page.create_date!==page.update_date" class="update-time">更新于
                        <time>{{ page.create_date.substring(0,10) }}</time>
                        &nbsp;|&nbsp;
                    </span>
                    <span class="create-user">作者
                        <router-link :to="{ name: 'userDetail', params: { username:  page.create_user } }">
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
    </div>

</template>
<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      page: {
        title: '',
        create_user: '',
        create_date: '',
        update_date: '',
        content: ''
      }
    }
  },
  mounted() {
    this.getPageDetail()
  },
  methods: {
    async getPageDetail() {
      this.Common.axios('/api/page/detail', { id: this.id }).then(res => {
        if (res.data.code === 'OK') {
          this.page = res.data.data
          this.$nextTick(() => {
            this.hljs.highlightCode()
          })
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
  margin-bottom: 120px;
}
</style>
