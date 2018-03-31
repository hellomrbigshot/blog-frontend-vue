<template>
    <div class="main-content">
        <div>
           <Table stripe :columns="user_column" :data="user_list"></Table>
        </div>
    </div>
</template>
<script>
import {Common} from '@/assets/js/common'
export default {
  name: 'userList',
  data () {
    return {
        user_column: [
            {
                title: '用户名',
                key: 'username'
            },
            {
                title: '密码',
                key: 'password'
            },
            {
                title: '性别',
                key: 'gender'
            }
        ],
        user_list: []
    }
  },
  mounted () {
      this.getUserList()
  },
  methods: {
    getUserList (pageSize='10', page='1') {
        Common.axios('/api/user/list', {pageSize, page}).then(res => {
            if (res.data.code === 'OK') {
                this.user_list = res.data.data.list
            }
        })
    }  
  }
}
</script>
<style scoped>
</style>
