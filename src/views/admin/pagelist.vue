<template>
    <div class="main-content">
        <Table :columns="columns" :data="list"></Table>
        <Page :total="total" style="margin-top: 20px" @on-change="pageChange"></Page>
    </div>
</template>
<script>
import {Common} from '@/assets/js/common'
export default {
  name: 'pageList',
  data () {
    return {
      list: [],
      total: 0,
      search_obj: {
        pageSize: 20,
        page: 1
      },
      status_mapping: {
        normal: '正文',
        draft: '草稿',
        cancel: '删除'
      },
      columns: [
        {
          title: 'id',
          key: '_id'
        },
        {
          title: '标题',
          key: 'title'
        },
        {
          title: '发起人',
          key: 'create_user'
        },
        {
          title: '是否私密',
          render: (h, params) => {
            return h('span', params.row.secret && '是' || '否')
          }
        },
        {
          title: '状态',
          render: (h, params) => {
            return h('span', this.status_mapping[params.row.status])
          }
        },
        {
          title: '操作',
          key: 'action',
          render: (h, params) => {
            return h('Button', {
              props: {
                type: 'error',
                size: 'small'
              },
              on: {
                click: () => {
                  this.deletePage(params.row)
                }
              }
            }, '删除')
          }
        }
      ]
    }
  },
  mounted () {
    this.getPageList()
  },
  methods: {
    getPageList () {
      this.Common.axios('/api/page/pagelist', this.search_obj).then(res => {
        if (res.data.code === 'OK') {
          this.list = res.data.data.result
          this.total = res.data.data.total
        }
      })
    },
    pageChange (page) {
      this.search_obj.page = page
      this.getPageList()
    },
    deletePage (page) {
      let send_obj = JSON.parse(JSON.stringify(page))
      send_obj.id = send_obj._id
      send_obj.status = 'cancel'
      this.Common.axios('/api/page/edit', send_obj).then(res => {
        if (res.data.code === 'OK') {
          this.$Message.success('操作成功')
          this.getPageList()
        } else {
          this.$Message.error('操作失败')
        }
      })
    }
  }
}
</script>
<style scoped>
</style>
