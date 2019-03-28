<template>
<div>
  <div :style="{ marginTop: '30px' }">
    <h2 :style="{fontSize: '14px', fontWeight: 'normal'}">当前总共{{ total }}个标签</h2>
    <div class="tag-list">
      <div v-for="(tag, index) in tagList" :key="index" class="tag-item">
        <router-link :to="{ name: 'normalTagDetail', params: { name: tag.name } }">
          <h3 class="tag-item-name">{{ tag.name }}</h3>
        </router-link>
        <div class="tag-item-desc">
          <span >{{ tag.description }}</span>
        </div>
        <div class="tag-item-bottom">
          <span>共有{{ tag.page_num }}篇文章</span>
        </div>
      </div>
    </div>
    <div class="pagination" style="margin-bottom: 20px;">
      <new-page v-if="total>pageSize" :total="total" @on-change="pageChange"></new-page>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data () {
      return {
          tagList: [],
          total: 0,
          page: 1,
          pageSize: 10
      }
  },
  mounted () {
    this.getTagList()
  },
  methods: {
    getTagList () {
      this.Common.axios('/api/tag/taglist', { page: this.page, pageSize: this.pageSize }).then(res => {
        this.tagList = res.data.data.result
        this.total = res.data.data.total
      })
    },
    pageChange (page) {
      this.page = page
      this.getTagList()
    }
  }
}
</script>
<style lang="scss" scoped>
.tag-list {
  overflow: hidden;
  margin-top: 26px;
  .tag-item {
    list-style: none;
    font-size: 14px;
    margin-bottom: 26px;
    box-sizing: content-box;
    &-name {
      color: #555;
      font-weight: 400;
      margin-bottom: 5px;
      font-size: 18px;
      &:hover {
        text-decoration: underline;
      }
    }
    &-desc {
      font-size: 13px;
      color: #545454;
      line-height: 1.4;
      word-wrap: break-word;
      margin-bottom: 3px;
    }
    &-bottom {
      font-size: 12px;
      color: #848484;
    }
  }
  
}
</style>