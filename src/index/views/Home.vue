<template>
  <div class="layout">
    <BackTop/>
    <BlogHeader
      v-if="!$route.meta.hideHeader"
      @on-change="handleRouter"
    />
    <keep-alive>
      <router-view
        class="blog-content"
        :key="$route.fullPath"
      />
    </keep-alive>
    <BlogFooter v-if="!$route.meta.hideFooter"/>
  </div>
</template>
<script>
// import io from 'socket.io-client'
export default {
  components: {
    BlogHeader: () => import('index/components/BlogHeader'),
    BlogFooter: () => import('index/components/BlogFooter')
    // siderUserInfo: () => import('index/components/SiderUserInfo')
  },
  data () {
    return {
      isCollapsed: true,
      // socket: io(`${process.env.NODE_ENV === 'development' ? 'http://localhost:8082' : 'https://hellomrbigbigshot.xyz'}`),
      unreadMsgNum: 0
    }
  },
  async created () {
    this.isCollapsed = !this.user
    // this.socket.on('unread-comment', msg => {
    //   if (msg > 0 && msg !== this.unreadMsgNum && this.$route.name !== 'normalGuestBook') {
    //     this.unreadMsgNum = msg
    //     this.$Notice.destroy()
    //     this.$Notice.info({
    //       title: '提示',
    //       render: h => {
    //         return h('div', [
    //           h('span', '你有'),
    //           h('a', {
    //             on: {
    //               click: () => {
    //                 this.$router.push({ name: 'normalGuestBook' })
    //               }
    //             }
    //           }, `${msg}`),
    //           h('span', '条未读信息')
    //         ])
    //       },
    //       duration: 0
    //     })
    //   }
    // })
  },
  computed: {
    user () {
      return this.Cookies.get('user') || this.$route.query.username || ''
    }
  },
  methods: {
    collapsedSider () {
      // 侧边栏显示切换
      this.$refs.pageSider.toggleCollapse()
    },
    handleRouter (name) {
      // 路由跳转
      this.$router.push({ name: name })
    }
  }
}
</script>
<style lang="scss" scoped>
.icon-wrapper {
  width: 25px;
  position: fixed;
  z-index: 111;
  right: 50px;
  bottom: 20px;
  .single-icon-wrapper {
    width: 25px;
    height: 25px;
    text-align: center;
    background: #222222;
    margin-top: 5px;
    cursor: pointer;
    .rotateIcon {
      transform: rotate(-90deg);
    }
  }
}
.page-sider {
  background: #222;
  height: 100vh;
  width: 320px;
  position: fixed;
  overflow: auto;
}
.collapsed-menu {
  width: 0 !important;
  min-width: 0 !important;
  max-width: 0 !important;
  transition: width 5s ease 5s;
}
.menu-icon {
  transition: all 0.3s;
}
.rotate-icon {
  transform: rotate(-90deg);
}
.pagination {
  margin: 120px 0;
}

.blog-content {
  margin: 80px auto 0;
  padding-top: 50px;
  min-height: calc(100vh - 160px);
}
@media (max-width: 991px) {
  .home-sider,
  .icon-wrapper {
    display: none;
  }
}
@media (max-width: 767px) {
  .blog-content {
    margin: 20px auto;
    width: auto;
  }
}
@media (max-width: 1600px) {
  .blog-content {
    width: 85%;
    max-width: 700px;
  }
}
@media (min-width: 1600px) {
  .blog-content {
    // margin: 20px 20px;
    width: 1000px;
  }
}
</style>
