<template>
  <div id="editor" class="editor">
      <div class="editor-input">
          <textarea v-model="input"></textarea>
      </div>
      <div class="editor-preview">
          <div v-html="compiledMarkdown"></div>
      </div>
      
  </div>
</template>

<script>
import marked from 'marked'
export default {
    data () {
        return {
            input: '### 用 markdown 写一篇文章'
        }
    },
    computed: {
        compiledMarkdown () {

        }
    }

}
</script>

<style lang="scss" scoped>
.editor {
    min-height: 500px;
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
            // box-sizing: border-box;
            width: 100%;
            min-height: 500px;
            // height: 100%;
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
        }
    }
}
</style>
