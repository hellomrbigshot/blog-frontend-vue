<template>
  <div>
    <Row :gutter="10">
        <Col :xs="24" :sm="12" :md="8">
            <info-card 
              info-text="用户数"
              color="#2d8cf0"
              icon-type="ios-people"
              :end-val="count.userNum"></info-card>
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
  }
}
</script>
