<template>
    <div id="editor" class="editor">
        <div class="edit-toolbar">
            <ul class="edit-mode">
                <li>
                    <a class="edit-menu__edit" title="编辑"></a>
                </li>
                <li>
                    <a class="edit-menu__live" title="实况"></a>
                </li>
                <li>
                    <a class="edit-menu__preview" title="预览"></a>
                </li>
            </ul>
        </div>
        <div class="edit-content">
            <div class="editor-input">
                <textarea v-model="input" spellcheck="false"></textarea>
            </div>
            <div class="editor-preview">
                <div v-html="compiledMarkdown"></div>
            </div>
        </div>  
  </div>
</template>
<script>
export default {
  data() {
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
    compiledMarkdown() {
      return this.marked(this.input)
    }
  },
  watch: {
    input(val) {
      this.$emit('input', this.input)
      this.$nextTick(() => {
        this.hljs.highlightCode()
      })
    },
    value(val) {
      this.input = val
    }
  },
  mounted() {
    this.markdown()
  },
  methods: {
    markdown() {
      // markdown 设置
      this.marked.setOptions({
        renderer: new this.marked.Renderer(),
        pedantic: false,
        gfm: true,
        tables: true,
        breaks: true,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        xhtml: false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.editor {
  height: 500px;
  color: #333;
  box-sizing: border-box;
  border: 1px solid #dddee1;
  .edit-toolbar {
      border-bottom: 1px solid #dddee1;
      .edit-mode {
          line-height: 0;
          list-style: none;
          li {
              display: inline-block;
          }
          a {
              display: inline-block;
              background-image: url("../../../assets/img/editor.png");
              background-repeat: no-repeat;
              width: 30px;
              height: 30px;
              border: 5px solid #fff;
              background-size: 380px 60px;
              overflow: hidden;
              text-indent: 110%;
            }
            .edit-menu__preview {
                background-position: -360px 0px;
            }
            .edit-menu__live {
                background-position: -340px 0px;
            }
            .edit-menu__edit {
                background-position: -320px 0px;
            }

      }
      
  }
  .editor-input,
  .editor-preview {
    box-sizing: border-box;
    float: left;
    width: 50%;
    min-height: 500px;
    height: 100%;
    textarea {
      padding: 8px 12px;
      box-sizing: border-box;
      width: 100%;
      height: 498px;
      border: none;
      border-right: 1px solid #dddee1;
      outline: none;
      resize: none;
    }
    div {
      padding: 8px 12px;
      // box-sizing: border-box;
      width: 100%;
      height: 498px;
      overflow-y: auto;
      background: #f6f6f6;
    }
  }
}
</style>
