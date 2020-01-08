<template>
  <div>
    <div :style="{ marginTop: '30px' }">
      <h2 :style="{fontSize: '14px', fontWeight: 'normal'}">当前总共 <span style="font-size: 16px; font-weight: bold;">{{ total }}</span> 个标签</h2>
      <div class="tag-list">
        <router-link
          class="tag-item"
          v-for="(tag, i) in tagList"
          :key="i"
          :to="{name: 'TagDetail', params: {name: tag.name}}"
        >{{ tag.name }}</router-link>
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
      pageSize: 999
    }
  },
  mounted () {
    this.getTagList()
  },
  methods: {
    getTagList () {
      this.Common.axios('/api/tag/taglist', { page: this.page, pageSize: this.pageSize })
        .then(res => {
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
  text-align: center;
  font-size: 0;
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .tag-item {
    font-size: 14px;
    font-weight: 500;
    padding: 5px 10px;
    border-radius: 5px;
    line-height: 24px;
    box-shadow: inset 0 0 1px 1px rgba(55, 55, 55, .3);
    color: #2c3e50;
    margin: 10px;
    transition: all .3s ease-in-out;
    &:hover {
      font-size: 16px;
      font-weight: bold;
      box-shadow: inset 0 0 1px 1px rgba(55, 55, 55, .6);
    }
  }
}
</style>
