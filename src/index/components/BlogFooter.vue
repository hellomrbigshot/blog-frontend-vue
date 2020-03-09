<template>
  <div class="blog-footer">
    <div class="blog-footer-content">
      <p>Created By Yeachan
        <a
          class="github-link"
          href="https://github.com/hellomrbigshot/VueExpressBlog"
        >
          <Icon
            type="logo-github"
            :size="20"
          />
        </a>
      </p>
      <p>由
        <a
          class="footer-link"
          target="_blank"
          href="https://cn.vuejs.org/"
        >Vue.js</a>
      强力驱动</p>
      <p :style="{textAlign: 'left', fontSize: '12px'}">备案号：<a class="footer-link" target="_blank" href="http://www.beian.miit.gov.cn">{{ ICP }}</a></p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ICP: '浙ICP备18011593号-1'
    }
  }
}
</script>
<style lang="scss" scoped>
.blog-footer {
  box-shadow: 0 -1px 0 0 #f0f0f0;
  padding: 10px 0;
}
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
.blog-footer-content {
  margin: 0 auto;
}
@media (max-width: 767px) {
  .blog-footer-content {
    margin: 20px 20px;
    width: auto;
  }
}
@media (max-width: 1600px) {
  .blog-footer-content {
    width: 85%;
    max-width: 700px;
  }
}
@media (min-width: 1600px) {
  .blog-footer-content {
    // margin: 20px 20px;
    width: 1000px;
  }
}
</style>
