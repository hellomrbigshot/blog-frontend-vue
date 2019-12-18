<template>
  <Card :padding="0">
    <Row class="card-content">
      <Col
        class="height-100"
        span="6"
        :style="{textAlign: 'center', background: color}"
      >
      <Row
        type="flex"
        justify="center"
        align="middle"
        class="height-100"
      >
        <Icon
          :type="iconType"
          :size="iconSize"
          color="#fff"
        ></Icon>
      </Row>
      </Col>
      <Col
        span="18"
        class="height-100"
      >
      <Row
        type="flex"
        justify="center"
        align="middle"
        class="height-100"
      >
        <div class="card-content-text">
          <count-up
            :end-val="endVal"
            :color="color"
            :id-name="idName"
            :count-size="countSize"
            :count-weight="countWeight"
          >
          </count-up>
          <!-- <p :style="{fontSize: countSize, fontWeight: countWeight, color: color}">{{ endVal }}</p> -->
          <p class="card-content-text-small">{{ infoText }}</p>
        </div>
      </Row>
      </Col>
    </Row>
  </Card>
</template>
<script>
import countUp from '../../components/countUp'
export default {
  components: {
    countUp
  },
  props: {
    idName: String,
    infoText: String,
    color: String,
    iconType: String,
    endVal: Number,
    countSize: {
      type: String,
      default: '40px'
    },
    countWeight: {
      type: Number,
      default: 700
    },
    iconSize: {
      type: Number,
      default: 40
    }
  },
  data () {
    return {

    }
  }
}
</script>
<style scoped lang="scss">
.card-content {
  height: 100px;
  .height-100 {
    height: 100%;
  }
  .card-content-text {
    text-align: center;
    .card-content-text-small {
      font-size: 12px;
      color: #c8c8c8;
    }
  }
}
</style>
