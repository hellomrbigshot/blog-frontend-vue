<template>
    <Form ref="pageForm" :rules="rule" :model="pageObject">
        <FormItem prop="title">
            <Input placeholder="标题" v-model="pageObject.title"></Input>
        </FormItem>
        <FormItem>
            <Select placehoder="标签，用 , 分隔" v-model="pageObject.tags"></Select>
        </FormItem>
        <FormItem prop="content">
            <markdown-editor v-model="pageObject.page_content"></markdown-editor>
        </FormItem>
        <FormItem>
            <Button @click="save('draft')">保存草稿</Button>
            <Button type="primary" @click="save('normal')">发布</Button>
        </FormItem>
    </Form>
</template>

<script>
import markdownEditor from './components/markdownEditor'
import highlight from 'highlight'
export default {
    components: {
        markdownEditor
    },
    data () {
        return {
            pageObject: {
                title: '',
                tags: [],
                content: '### 用 markdown 写一篇文章',
                status: ''
            },
            rule: {
                title: [{
                    required: true,
                    type: 'string',
                    message: '请输入文章标题'
                }],
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
    methods: {
        save (type) {
            this.$refs['pageForm'].validate(valid => {
                if (valid) {
                    this.pageObject.status = type
                    this.Common.axios('/api/page/new', this.pageObject).then(res => {
                        if (res.data.code === 'OK') {
                            this.$Message.success('提交成功')
                        } else {
                            this.$Message.error(res.data.data)
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
