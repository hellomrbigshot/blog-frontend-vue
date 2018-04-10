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
              userNum: 100,
              pageNum: 100,
              tagNum: 100
          }
      }
  },
  methods: {
      
  }
}
</script>
