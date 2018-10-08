<template>
    <div id="editor" :class="['editor', fullScreen && 'editor_fullscreen']">
        <div class="edit-toolbar">
            <ul class="edit-mode">
                <li>
                    <a :class="[fullScreen && 'edit-menu__unzen', !fullScreen && 'edit-menu__zen']" title="全屏" @click="fullScreen=!fullScreen"></a>
                </li>
                <li>
                    <a :class="['edit-menu__edit', mode === 'edit' && 'muted']" title="编辑" @click="mode='edit'"></a>
                </li>
                <li>
                    <a :class="['edit-menu__live',  mode === 'live' && 'muted']" title="实时" @click="mode='live'"></a>
                </li>
                <li>
                    <a :class="['edit-menu__preview',  mode === 'preview' && 'muted']" title="预览" @click="mode='preview'"></a>
                </li>
            </ul>
        </div>
        <div :class="['edit-content']">
            <div class="edit-content-scroll">
                <transition v-show="mode!=='preview'">
                    <div v-show="mode!=='preview'" :class="['editor-input', mode === 'edit' && 'edit-full']">
                        <textarea v-model="input" spellcheck="false"></textarea>
                    </div>
                </transition>
                <transition v-show="mode!=='edit'">
                    <div :class="['editor-preview', mode === 'preview' && 'edit-full']">
                        <div v-html="compiledMarkdown"></div>
                    </div>
                </transition>
            </div>

        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      input: this.value,
      mode: 'live',
      fullScreen: false
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
  }
}
</script>

<style lang="scss" scoped>
.editor {
  position: relative;
  height: 531px;
  color: #333;
  box-sizing: border-box;
  border: 1px solid #dddee1;
  overflow: hidden;
  .edit-toolbar {
    border-bottom: 1px solid #dddee1;
    position: absolute;
    background: #fff;
    width: 100%;
    .edit-mode {
      line-height: 0;
      list-style: none;
      li {
        display: inline-block;
      }
      a {
        display: inline-block;
        background-image: url('../../../assets/img/editor.png');
        background-repeat: no-repeat;
        width: 30px;
        height: 30px;
        border: 5px solid #fff;
        background-size: 380px 60px;
        overflow: hidden;
        text-indent: 110%;
        &:hover {
          background-position-y: -40px;
        }
      }
      .edit-menu__preview {
        background-position: -360px 0;
      }
      .edit-menu__live {
        background-position: -340px 0;
      }
      .edit-menu__edit {
        background-position: -320px 0;
      }
      .edit-menu__unzen {
        background-position: -260px 0;
      }
      .edit-menu__zen {
        background-position: -240px 0;
      }
      .muted {
        background-position-y: -20px;
        cursor: default;
        &:hover {
          background-position-y: -20px;
        }
      }
    }
  }
  .edit-content {
    min-height: 500px;
    height: 100%;
    .edit-content-scroll {
      padding-top: 32px;
      height: 100%;
    }
  }
  .editor-input,
  .editor-preview {
    box-sizing: border-box;
    float: left;
    width: 50%;
    height: 100%;
    textarea {
      padding: 8px 12px;
      box-sizing: border-box;
      width: 100%;
      //   height: 498px;
      height: 100%;
      border: none;

      outline: none;
      resize: none;
    }
    div {
      padding: 8px 12px;
      // box-sizing: border-box;
      width: 100%;
      height: 100%;
      overflow-y: auto;
      background: #f6f6f6;
    }
  }
  .editor-input {
    border-right: 1px solid #dddee1;
  }
  .edit-full {
    width: 100%;
    border-right: 0;
  }
}
.editor_fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  margin-top: 0;
  border: none;
  width: 100%;
  height: 100vh !important;
  background-color: #f6f6f6;
}
</style>
