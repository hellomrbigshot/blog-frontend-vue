<template>
  <article>
      <header>
          <router-link :to="{}">
              <h1 class="page-title">{{ page.title }}</h1>
          </router-link>
          <div class="page-info">
              <span class="create-time">创建于 <time>{{ page.create_date.substring(0,10) }}</time></span>
              <span class="create-user">&nbsp;|&nbsp;作者 {{ page.create_user }}</span>
              <span>&nbsp;|&nbsp;</span>
          </div>
      </header>
      <div class="page-body" v-html="markdownBody"></div>
  </article>
</template>

<script>
export default {
    props: ['page'],
    computed: {
        markdownBody () {
            return this.marked(this.page.content)
        }
    }
}
</script>
<style lang="scss" scope>
article {
    header {
        font-family: Lato, "PingFang SC", "Microsoft YaHei", sans-serif;
        .page-title {
            font-weight: 400;
            font-size: 26px;
            margin: 20px 0 10px;
            color: #000;
        }
        .page-info {
            color: #999;
            font-size: 12px;
            margin: 0 0 20px;
        }
    }
    margin-bottom: 120px;
    max-height: 300px;
    overflow: hidden;
}
 
</style>
