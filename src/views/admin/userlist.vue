<template>
    <div class="main-content">
        <div>
           这是一个用户列表
        </div>
    </div>
</template>
<script>
import {Common} from '@/assets/js/common'
export default {
  name: 'userList',
  data () {
    user_list: []
  },
  mounted () {
      this.getUserList()
  },
  methods: {
    getUserList (pageSize='10', page='1') {
        Common.axios('/api/user/list', {pageSize, page}).then(res => {

        })
    }  
  }
}
</script>
<style scoped>
</style>
