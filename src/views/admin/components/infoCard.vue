<template>
  <Card :title="infoText" :icon="iconType">
      <div slot="title">
          <Icon :type="iconType" :size="iconSize" :color="color"></Icon>
          <span :style="{fontSize: '20px', marginLeft: '5px', lineHeight: iconSize+'px', color: color}">{{ infoText }}</span>
      </div>
      <div :style="{textAlign: 'center', fontSize: countSize, fontWeight: countWeight, color: color}">
          {{ endVal }}
      </div>
  </Card>
</template>
<script>
export default {
    props: {
        infoText: String,
        color: String,
        iconType: String,
        endVal: Number,
        countSize: {
            type: String,
            default: '35px'
        },
        countWeight: {
            type: Number,
            default: 700
        },
        iconSize: {
            type: Number,
            default: 30
        }
    },
    data () {
        return {

        }
    }
}
</script>
