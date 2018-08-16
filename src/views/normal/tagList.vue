<template>
<div>
  <div :style="{ marginTop: '30px' }">
    <h2 :style="{fontSize: '14px', fontWeight: 'normal', textAlign: 'center'}">当前总共{{ total }}个标签</h2>
    <ul>
      <li v-for="(tag, index) in tagList">
        <router-link :to="{ name: 'normalTagDetail', params: { name: tag.name } }">
          <span class="tag-name">{{ tag.name }}</span>
        </router-link>
        <span class="tag-page-count">({{tag.page_num}})</span>
      </li>
    </ul>
    <div class="pagination">
      <new-page v-if="total>pageSize" :total="total" @on-change="pageChange"></new-page>
    </div>
  </div>
</div>
</template>
<script>
// import page from './components/page'
export default {
  components: {
    // page
  },
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
ul {
  overflow: hidden;
  margin-top: 40px;
  li {
    list-style: none;
    font-size: 14px;
    margin: 20px 0 20px 10px;
    box-sizing: content-box;
    .tag-name {
      color: #555;
      border-bottom: 1px solid #bbb;
      margin: 5px 0 10px 5px;
      &:hover {
        border-bottom-color: #222;
        color: #222;
      }
    }
    .tag-page-count {
      color: #bbb;
    }
  }
  
}
</style>