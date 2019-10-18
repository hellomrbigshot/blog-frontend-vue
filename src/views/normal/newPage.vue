<template>
  <div>
    <el-form
      ref="pageForm"
      :rules="rule"
      :model="pageObject"
    >
      <el-form-item prop="title">
        <el-input
          placeholder="标题"
          v-model="pageObject.title"
        />
      </el-form-item>
      <el-form-item prop="tags">
        <el-select
          placehoder="标签"
          ref="tagSelect"
          v-model="pageObject.tags"
          :multiple="true"
          :filterable="true"
          allow-create
          style="width: 100%"
          @change="selectChange"
        >
          <el-option
            v-for="(name, index) in tagList"
            :value="name"
            :key="index"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="content">
        <markdown-editor v-model="pageObject.content" theme="dark"/>
      </el-form-item>
      <el-form-item label="是否私密">
        <el-switch v-model="pageObject.secret"/>
      </el-form-item>
      <el-form-item>
        <el-button @click="save('draft')">保存草稿</el-button>
        <el-button
          type="primary"
          @click="save('normal')"
        >发布</el-button>
      </el-form-item>
    </el-form>
    <Modal
      v-model="tagModal"
      title="创建标签"
    >
      <Form
        ref="tagForm"
        :model="tag_obj"
        :rules="tagRule"
      >
        <FormItem prop="name">
          <Input v-model="tag_obj.name" />
        </FormItem>
        <FormItem prop="description">
          <Input
            v-model="tag_obj.description"
            type="textarea"
            placeholder="输入对标签的描述"
          />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="tagModal = false">取消</Button>
        <Button
          type="primary"
          @click="createTagSubmit"
        >确定</Button>
      </div>
    </Modal>
  </div>

</template>

<script>
import MEditor from 'simple-m-editor'
export default {
  components: {
    MarkdownEditor: MEditor
  },
  data() {
    return {
      id: this.$route.params.id,
      tagList: [],
      tagModal: false,
      tag_obj: {
        name: '',
        description: ''
      },
      tagRule: {
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
      },
      pageObject: {
        title: '',
        tags: [],
        content: '### 用 markdown 写一篇文章',
        status: '',
        secret: false
      },
      rule: {
        title: [
          {
            required: true,
            type: 'string',
            message: '请输入文章标题'
          }
        ],
        tags: [
          {
            required: true,
            type: 'array',
            message: '请选择标签'
          }
        ],
        content: [
          {
            required: true,
            type: 'string',
            message: '请输入文章内容'
          }
        ]
      }
    }
  },
  async mounted() {
    await this.getAllTags()
    this.getPageDetail()
  },
  beforeRouteLeave(to, from, next) {
    if (this.pageObject.title || this.pageObject.tags.length) {
      this.$Modal.confirm({
        title: '提示',
        content: '<p>你有未保存的文章，确定要离开吗？</p>',
        okText: '离开',
        cancelText: '取消',
        onOk: () => {
          next()
        }
      })
    } else {
      next()
    }
  },
  methods: {
    getAllTags() {
      return this.Common.axios('/api/tag/alltags').then(res => {
        this.tagList = res.data.data
      })
    },
    selectChange(arr) {
      // 判断是否新增 tag
      const lastTag = arr.pop()
      if (this.tagList.includes(lastTag)) {
        arr.push(lastTag)
      } else {
        setTimeout(() => {
          this.$refs['tagSelect'].blur()
          this.tag_obj.name = lastTag
          this.tagModal = true
        }, 30)
      }
    },
    getPageDetail() {
      if (this.id) {
        this.Common.axios('/api/page/detail', { id: this.id }).then(res => {
          this.$set(this, 'pageObject', res.data.data)
          if (typeof (this.pageObject.secret) === 'undefined') {
            this.$set(this.pageObject, 'secret', false)
          }
        })
      } else {
        return false
      }
    },
    createTagSubmit() {
      this.$refs['tagForm'].validate(valid => {
        if (valid) {
          this.Common.axios('/api/tag/create', this.tag_obj).then(async (res) => {
            this.tagModal = false
            await this.getAllTags()
            this.pageObject.tags.push(this.tag_obj.name)
            this.$refs['tagForm'].resetFields()
          })
        }
      })
    },

    save(type) {
      this.$refs['pageForm'].validate(valid => {
        if (valid) {
          this.pageObject.status = type
          let url = ''
          if (this.id) {
            url = '/api/page/edit'
            this.pageObject.id = this.id
          } else {
            url = '/api/page/new'
          }
          this.Common.axios(url, this.pageObject).then(res => {
            this.$Message.success('提交成功')
            this.$store.commit('updateUserInfo', res.data.data)
            this.$refs['pageForm'].resetFields()
            if (type === 'normal' && this.id) {
              this.$router.push({ name: 'pageDetail', params: { id: this.id } })
            } else if (type === 'normal' && !this.id) {
              this.$router.push({ name: 'normalPageList' })
            } else {
              this.$router.push({ name: 'normalMyDraftList' })
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.ivu-form-item {
  margin-bottom: 18px;
}
</style>
