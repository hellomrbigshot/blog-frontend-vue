<template>
    <div class="main-content">
        <div>
           <Table :columns="user_column" :data="user_list"></Table>
        </div>
        <div style="margin-top: 20px">
            <Page :total="total" show-sizer @on-change="pageChange" @on-page-size-change="pageSizeChange"></Page>
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
                render: (h, params) => {
                    return h('span', this.gender_obj[params.row.gender])
                }
            },
            {
                title: '操作',

            }
        ],
        user_list: [],
        total: 0,
        page_size: 10,
        page: 1,
        gender_obj: {
            'f': '女',
            'm': '男',
            'x': '未知'
        }
    }
  },
  mounted () {
      this.getUserList()
  },
  methods: {
    getUserList (pageSize='10', page='1') { // 获取用户列表
        this.Common.axios('/api/user/list', {pageSize, page}).then(res => {
            if (res.data.code === 'OK') {
                this.user_list = res.data.data.list
                this.total = res.data.data.total_num
            }
        })
    },
    pageChange (page) {
        this.page = page
        this.getUserList(this.page_size, this.page)
    },
    pageSizeChange (pageSize) {
        this.page_size = pageSize
        this.getUserList(this.page_size, this.page)
    }
  }
}
</script>
<style scoped>
</style>
