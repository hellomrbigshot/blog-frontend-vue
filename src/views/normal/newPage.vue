<template>
    <Form>
        <FormItem>
            <Input placeholder="标题"></Input>
        </FormItem>
        <FormItem>
            <Select placehoder="标签，用 , 分隔"></Select>
        </FormItem>
        <FormItem>
            <markdown-editor v-model="pageObject.page_content"></markdown-editor>
        </FormItem>
    </Form>
</template>

<script>
import markdownEditor from './components/markdownEditor'
export default {
    components: {
        markdownEditor
    },
    data () {
        return {
            pageObject: {
                title: '',
                tags: [],
                page_content: '### 用 markdown 写一篇文章'
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .ivu-form-item {
        margin-bottom: 18px;
    }
</style>
