<template>
    <div>
        <article v-for="(page, i) in pageList" :key="i" class="article">
            <header class="page-header">
                <router-link :to="{ name: 'PageDetail', params: { id: page._id } }">
                    <h1 class="page-title">
                        {{ page.title }}
                    </h1>
                </router-link>
                <div class="page-meta">
                    <time>{{ page.create_time.substring(5, 10) }}</time>
                </div>
            </header>
        </article>
    </div>

</template>

<script>
export default {
  props: {
    pageList: {
      type: Array
    }
  }
}
</script>

<style lang="scss" scoped>
.article {
  margin: 30px 0;
  box-sizing: content-box;
  position: relative;
  font-size: 14px;
  line-height: 2;
  .page-header {
    border-bottom: 1px dashed #ccc;
    transition: border 0.2s ease-in-out;
    color: #555;
    &:hover {
      border-bottom-color: #666;
      &:before {
        background: #222;
      }
    }
    &:before {
      box-sizing: content-box;
      content: '';
      position: absolute;
      left: 0;
      top: 12px;
      width: 6px;
      height: 6px;
      margin-left: -4px;
      background: #bbb;
      border-radius: 50%;
      border: 1px solid #fff;
      transition: background 0.2s ease-in-out;
    }
    .page-title {
      margin: 20px 0 10px 60px;
      font-size: 16px;
      color: #666;
      font-weight: normal;
      line-height: inherit;
      &:after {
        margin-left: 3px;
        opacity: 0.6;
      }
    }
    .page-meta {
      position: absolute;
      font-size: 12px;
      top: 5px;
      left: 20px;
    }
  }
}
</style>
