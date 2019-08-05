<template>
  <div class="main-content">
    <div>
      <h1>404</h1>
    </div>
    <div>
      <h2>页面不存在</h2>
    </div>
    <div>
      <Button @click="goHome">返回首页</Button>
      <Button
        type="primary"
        @click="backPage"
      >返回上一页</Button>
    </div>
  </div>
</template>
<script>
export default {
  name: '404',
  data() {
    return {
    }
  },
  methods: {
    goHome() { // 返回 home 页
      if (this.Cookies.user === 'admin') {
        this.$router.push({ name: 'admin' })
      } else {
        this.$router.push({ name: 'main' })
      }
    },
    backPage() { // 返回上一页
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
.main-content {
  width: 400px;
  margin: 200px auto;
  div {
    text-align: center;
    margin-top: 10px;
    h1 {
      font-size: 100px;
    }
    h2 {
      font-size: 60px;
    }
    :nth-child(2) {
      margin-left: 30px;
    }
  }
}
</style>
