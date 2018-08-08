<template>
  <div>
    <Row :gutter="10">
        <Col :xs="24" :sm="12" :md="8">
            <router-link :to="{name: 'adminUserList'}"> 
                <info-card 
                    info-text="用户数"
                    id-name="user_num"
                    color="#2d8cf0"
                    icon-type="ios-people"
                    :end-val="count.userNum"></info-card>
            </router-link>
            
        </Col>
        <Col :xs="24" :sm="12" :md="8">
            <router-link :to="{name: 'adminPageList'}"> 
                <info-card 
                    info-text="文章数"
                    id-name="page_num"
                    color="#64d572"
                    icon-type="document-text"
                    :end-val="count.pageNum"></info-card>
            </router-link>
            
        </Col>
    </Row>
  </div>
</template>
<script>
import infoCard from './components/infoCard'

export default {
  components: {
      infoCard,
  },
  data () {
      return {
          count: {
              userNum: 0,
              pageNum: 0,
              tagNum: 0
          }
      }
  },
  mounted () {
      this.initPage()
  },
  methods: {
      initPage () {
          this.Common.axios('/api/statistics').then(res => {
                this.count = res.data.data
          })
      }
  }
}
</script>
