<template>
    <div class="main-content">
      <Table :columns="columns" :data="list"></Table>
    </div>
</template>
<script>
export default {
  name: 'tagList',
  data () {
    return {
      columns: [
        {
          title: 'id',
          key: '_id'
        },
        {
          title: '标签名',
          key: 'name'
        },
        {
          title: '关联文章数',
          key: 'page_num'
        },
        {
          title: '操作',
          render: (h, params) => {
            return h('Button', {
              props: {
                type: 'primary',
                size: 'small'
              },
              on: {
                click: () => {
                  
                }
              }
            }, '编辑')
          }
        }
      ],
      list: []
    }
  },
  mounted () {
    this.getTaglist()
  },
  methods: {
      getTaglist () {
        this.Common.axios('/api/tag/taglist').then(res => {
          this.list = res.data.data.result
        })
      }
  }
}
</script>
<style scoped>
</style>
