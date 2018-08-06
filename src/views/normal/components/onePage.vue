<template>
    <article>
        <header>
            <router-link :to="{ name: 'pageDetail', params: {id: page._id} }">
                <h1 class="page-title">{{ page.title }}</h1>
            </router-link>
            <div class="page-info">
                <span class="create-time">创建于
                    <time>{{ page.create_date.substring(0,10) }}</time>
                </span>
                <span class="create-user">&nbsp;|&nbsp;作者
                    <router-link :to="{ name: 'userDetail', params: { username:  page.create_user } }">
                        <span class="user-span">{{ page.create_user }}</span>
                    </router-link>
                </span>
                <span class="page-tag">&nbsp;|&nbsp;标签
                    <template v-for="(tag, i) in page.tags">
                        <router-link :to="{ name: 'normalTagDetail', params: { name:  tag} }">
                            <span class="tag-span">{{ tag }}</span>
                        </router-link>
                        <span v-if="i<page.tags.length-1">,</span>
                    </template>

                </span>
            </div>
        </header>
        <div class="page-body" v-html="markdownBody"></div>
    </article>
</template>

<script>
export default {
  props: ['page'],
  computed: {
    markdownBody() {
      return this.marked(this.page.content)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.hljs.highlightCode()
    })
  }
}
</script>
<style lang="scss" scoped>
article {
  header {
    font-family: Lato, 'PingFang SC', 'Microsoft YaHei', sans-serif;
    .page-title {
      font-weight: 400;
      font-size: 26px;
      margin-bottom: 10px;
      width: auto;
      display: inline-block;
      color: #555;
      border-bottom: 2px solid #fff;
      &:hover {
        border-bottom: 2px solid #000;
      }
    }
    .page-info {
      color: #999;
      font-size: 12px;
      margin: 0 0 20px;
      .user-span,
      .tag-span {
        color: #555;
        display: inline-block;
        border-bottom: 1px solid #ccc;
        &:hover {
          border-bottom-color: #222;
          color: #222;
        }
      }
    }
  }
  .page-body {
    line-height: 2;
    font-size: 14px;
  }
  margin-bottom: 120px;
  // max-height: 300px;
  // overflow: hidden;
}
</style>
