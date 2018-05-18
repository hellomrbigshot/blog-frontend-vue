<template>
<div>
  <Timeline>
    <TimelineItem>嗯..! 目前共计 {{total}} 篇日志。 继续努力。</TimelineItem>
    <TimelineItem color="#aaaaaa" v-for="(page,i) in pageList" :key="i">
        <p class="time">{{ page.create_date.substring(0,10) }}</p>
        <div class="content">
          <router-link :to="{name: 'pageDetail', params: {id: page._id}}">
              <span class="draft-title">{{ page.title }}</span>
          </router-link>
          <template v-if="page.secret">
            <span>|</span>
            <span class="secret">私密</span>
          </template>
          
        </div>
    </TimelineItem>
  </Timeline>
  <div :style="{marginBottom: '20px'}" v-if="pageSize<total">
    <new-page :total="total"></new-page>
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
          pageList: [],
          show_page: false,
          pageSize: 10,
          page: 1,
          total: 0,
          user: JSON.parse(localStorage.getItem('user'))
      }
  },
  mounted () {
    this.getPageList()
  },
  methods: {
    getPageList () {
      const post_data = {
        type: 'create_user', 
        status: 'normal', 
        content: this.user.username, 
        pageSize: this.pageSize, 
        page: this.page
      }
      this.Common.axios('/api/page/pagelist', post_data)
        .then(res => {
          if (res.data.code === 'OK') {
            this.pageList = res.data.data.result
            this.total = res.data.data.total
          }
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.time{
    font-size: 14px;
    font-weight: bold;
}
.content{
    padding-left: 5px;
}
.draft-title {
    padding-right: 20px;
    font-weight: 400;
    font-size: 14px;
    width: auto;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    color: #000;
    &:hover {
        text-decoration: underline;
    }
}
.secret {
  display: inline-block;
  padding: 2px 4px;
  background: #de0d75;
  color: #fff;
  font-size: 12px;
  border-radius: 5px;
}
</style>
