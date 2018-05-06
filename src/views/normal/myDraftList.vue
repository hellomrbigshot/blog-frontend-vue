<template>
<div>
  
</div>
</template>

<script>
export default {
  data () {
    return {
      page_list: []
    }
  },
  mounted () {
    this.Common.axios('/api/page/pagelist', {}).then(res => {
      if (res.data.code === 'OK') {
        this.draft_list = res.data.data
      }
    })
    
  }
}
</script>

<style>

</style>
