<template>
  <div id="editor" class="editor">
      <div class="editor-input">
          <textarea v-model="input" spellcheck="false"></textarea>
      </div>
      <div class="editor-preview">
          <div v-html="compiledMarkdown"></div>
      </div>
      
  </div>
</template>

<script>
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/googlecode.css'
hljs.highlightCode =   function () { // 自定义highlightCode方法，将只执行一次的逻辑去掉
    let blocks = document.querySelectorAll('pre code')
    Array.prototype.forEach.call(blocks, hljs.highlightBlock)
}
export default {
    data () {
        return {
            input: this.value
        }
    },
    props: {
        value: {
            type: String,
            default: '### 用 markdown 写一篇文章'
        }
    },
    computed: {
        compiledMarkdown () {
            return marked(this.input)
        }
    },
    watch: {
        input (val) {
            this.$emit('input', this.compiledMarkdown)
            this.$nextTick(() => {
                hljs.highlightCode()
            })
        }
    }

}
</script>

<style lang="scss" scoped>
.editor {
    height: 500px;
    color: #333;
    // box-sizing: border-box;
    border: 1px solid #dddee1;
    .editor-input, .editor-preview {
        // box-sizing: border-box;
        float: left;
        width: 50%;
        min-height: 500px;
        height: 100%;
        textarea {
            padding: 8px 12px;
            box-sizing: border-box;
            width: 100%;
            min-height: 500px;
            height: 100%;
            border: none;
            border-right: 1px solid #dddee1;
            outline: none;
            resize: none;
        }
        div {
            padding: 8px 12px;
            // box-sizing: border-box;
            width: 100%;
            min-height: 500px;
            height: 100%;
            overflow-y: auto;
            background: #f6f6f6;
        }
    }
}
</style>
