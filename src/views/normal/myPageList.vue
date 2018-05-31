<template>
<div>
  <Timeline>
    <TimelineItem color="#aaaaaa">
      <!-- <div slot="dot" :style="{width:'13px',height:'13px',borderRadius:'50%',background:'#555',position:'absolute', border:'1px solid transparent'}"></div> -->
      <span>嗯..! 目前共计 {{total}} 篇日志。 继续努力。</span>
    </TimelineItem>
    <template v-for="(year,i) in pageList">
      <TimelineItem color="#aaa">
        <span class="year">{{year.year}}</span>
      </TimelineItem>
      <TimelineItem color="#aaa" v-for="(page,j) in year.pagelist" :key="j">
        <router-link :to="{name: 'pageDetail', params: {id: page._id}}">
          <div class="content">
            <span class="time">{{ page.create_date.substring(5,10) }}</span>
            <span class="draft-title">{{ page.title }}</span>
            <template v-if="page.secret">
              <span :style="{fontSize: '16px'}">|</span>
              <span class="secret">私密</span>
            </template>
          </div>
        </router-link>
      </TimelineItem>
    </template>
    
  </Timeline>
  <div class="pagination" >
    <new-page :total="total" v-if="pageSize<total"></new-page>
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
      this.Common.axios('/api/page/limitpagelist', post_data)
        .then(res => {
          if (res.data.code === 'OK') {
            this.pageList = this.seperateByYear(res.data.data.result) 
            this.total = res.data.data.total
          }
        })
    },
    seperateByYear (pagelist) { // 将文章按照创建年份分类
      let year_arr = []
      pagelist.forEach(page => {
        let year = page.create_date.substring(0,4)
        if (!year_arr.includes(year)) {
          year_arr.push(year)
        }
      })
      return year_arr.map(year => {
        let single = {}
        single.year = year
        single.pagelist = pagelist.filter(page => page.create_date.substring(0,4) === year)
        return single
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.year {
  font-size: 22px;
  color: #555;
}
.content{
  color: #666;
  padding: 0 0 10px;
  border-bottom: 1px dashed #cccccc;
  &:hover {
    border-color: #666;
  }
  .time{
      font-size: 12px;
  }
    
  .draft-title {
    // padding-right: 5px;
    padding-left: 5px;
    width: auto;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 16px;
  }
  .secret {
    display: inline-block;
    padding: 1px 2px;
    background: #de0d75;
    color: #fff;
    font-size: 12px;
    border-radius: 5px;
  }
  
}


</style>
