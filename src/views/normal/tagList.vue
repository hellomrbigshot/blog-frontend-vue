<template>
<div>
  <Button  size="small" @click="create_modal=true">添加标签</Button>
  <div :style="{ marginTop: '30px' }">
    <h2 :style="{fontSize: '14px', fontWeight: 'normal', textAlign: 'center'}">目前总共{{ total }}个标签</h2>
    <ul>
      <li v-for="(tag, index) in tagList">
        <router-link :to="{ name: 'normalTagDetail', params: { name: tag.name } }">
          <span class="tag-name">{{ tag.name }}</span>
        </router-link>
        <span class="tag-page-count">({{tag.page_num}})</span>
      </li>
    </ul>
    <div class="pagination">
      <new-page v-if="total>pageSize" :total="total" @on-change="pageChange"></new-page>
    </div>
  </div>
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
              this.getTagList()
              this.$refs['tagForm'].resetFields()
            } else {
              this.$Message.error(res.data.data)
            }
          })
        }
      })
    },
    getTagList () {
      this.Common.axios('/api/tag/taglist', { page: this.page, pageSize: this.pageSize }).then(res => {
        if (res.data.code === 'OK') {
          this.tagList = res.data.data.result
          this.total = res.data.data.total
        } else {
          this.$Message.error(res.data.data)
        }
      })
    },
    pageChange (page) {
      this.page = page
      this.getTagList()
    }
  }
}
</script>
<style lang="scss" scoped>
ul {
  overflow: hidden;
  margin-top: 40px;
  li {
    list-style: none;
    font-size: 14px;
    margin: 20px 0 20px 10px;
    box-sizing: content-box;
    .tag-name {
      color: #555;
      border-bottom: 1px solid #bbb;
      margin: 5px 0 10px 5px;
      &:hover {
        border-bottom-color: #222;
        color: #222;
      }
    }
    .tag-page-count {
      color: #bbb;
    }
  }
  
}
</style>