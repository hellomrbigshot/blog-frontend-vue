<template>
<div>
  <Button  size="small" @click="create_modal=true">添加标签</Button>
  <Modal v-model="create_modal" title="创建标签">
    <Form ref="tagForm" :model="tag_obj" :rules="rule" >
      <FormItem prop="name">
        <Input v-model="tag_obj.name"></Input>
      </FormItem>
      <FormItem prop="description">
        <Input v-model="tag_obj.description" type="textarea" placeholder="输入对标签的描述"></Input>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button @click="create_modal=false">取消</Button>
      <Button type="primary" @click="createSubmit">确定</Button>
    </div>
  </Modal>
</div>
</template>
<script>
// import page from './components/page'
export default {
  components: {
    // page
  },
  data () {
      return {
          tagList: [],
          total: 0,
          page: 1,
          pageSize: 10,
          create_modal: false,
          tag_obj: {
            name: '',
            description: ''
          },
          rule: {
            name: [
              {
                required: true,
                trigger: 'change'
              }
            ],
            description: [
              {
                required: true,
                trigger: 'change'
              }
            ]
          }
      }
  },
  mounted () {
    this.getTagList()
  },
  methods: {
    createSubmit () {
      this.$refs['tagForm'].validate(valid => {
        if (valid) {
          this.Common.axios('/api/tag/create', this.tag_obj).then(res => {
            if (res.data.code === 'OK') {
              this.create_modal = false
            } else {
              this.$Message.error(res.data.data)
            }
          })
        }
      })
    },
    async getTagList () {
      try {
        let result = await this.Common.axios('/api/tag/taglist', { page: this.page, pageSize: this.pageSize })
        if (result.data.code === 'OK') {
          this.tagList = res.data.data.result
          this.total = res.data.data.total
        } else {
          this.$Message.error(res.data.data)
        }
      } catch (e) {

      }
      
    }
  }
}
</script>