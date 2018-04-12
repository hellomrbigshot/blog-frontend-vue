<template>
  <div>
    <Row :gutter="10">
        <Col :xs="24" :sm="12" :md="8">
            <router-link :to="{name: 'userList'}"> 
                <info-card 
                    info-text="用户数"
                    id-name="user_num"
                    color="#2d8cf0"
                    icon-type="ios-people"
                    :end-val="count.userNum"></info-card>
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
              if (res.data.code === 'OK') {
                  this.count = res.data.data
              }
          })
      }
  }
}
</script>
