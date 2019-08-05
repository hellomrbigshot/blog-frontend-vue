<template>
  <div>
    <p>Created By Yeachan <a
        class="github-link"
        href="https://github.com/hellomrbigshot/VueExpressBlog"
      >
        <Icon
          type="logo-github"
          :size="20"
        ></Icon>
      </a></p>
    <p>由 <a
        class="footer-link"
        href="https://cn.vuejs.org/"
      >Vue.js</a> 和 <a
        class="footer-link"
        href="https://www.iviewui.com/"
      >iView</a> 强力驱动</p>
    <p :style="{textAlign: 'left', fontSize: '12px'}">备案号：{{ ICP }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ICP: '浙ICP备18011593号-1'
    }
  }
}
</script>
<style lang="scss" scoped>
p {
  margin-top: 5px;
}
.github-link {
  color: #495060;
  &:hover {
    color: #000;
  }
}
.footer-link {
  border-bottom: 1px solid rgb(153, 153, 153);
  color: #495060;
  &:hover {
    color: #000;
    border-bottom-color: #000;
  }
}
</style>
