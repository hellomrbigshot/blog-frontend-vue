<template>
    <div class="main-content">
        <Table :colums="columns" :data="list"></Table>
    </div>
</template>
<script>
import {Common} from '@/assets/js/common'
export default {
  name: 'pageList',
  data () {
    return {
      columns: [
        {

        }
      ],
      list: []
    }
  },
  methods: {
  }
}
</script>
<style scoped>
</style>
