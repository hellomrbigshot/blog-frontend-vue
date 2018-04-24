<template>
<div>首页</div>
</template>
<script>
export default {
  data () {
      return {
          
      }
  },
  mounted () {
    this.Common.axios('/api/page/pagelist').then(res => {
      
    })
  }
}
</script>

