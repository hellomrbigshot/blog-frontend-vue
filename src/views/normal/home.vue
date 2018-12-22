<template>
<div class="layout">
  <div class="icon-wrapper">
    <div class="single-icon-wrapper" v-if="user">
      <Icon @click.native="collapsedSider" :class="rotateIcon" color="#fff" type="md-menu" size="22"></Icon>
    </div>
    <div class="single-icon-wrapper">
      <Icon @click.native="Common.bodyScrollTop()" color="#fff" type="ios-arrow-up" size="22"></Icon>
    </div>
  </div>
  <Layout>
      <Layout :style="{minHeight: '100vh'}">
          <Header :style="{padding: 0, background: '#f5f5f5', height: 'auto'}" class="layout-header-bar">
            <blog-header @on-change="handleRouter"></blog-header>
          </Header>
          <Content :style="{background: '#fff', minHeight: '260px'}">
              <router-view class="main-content"></router-view>
          </Content>
          <Footer class="main-footer">
            <blog-footer></blog-footer>
          </Footer>
      </Layout>
      <Sider ref="pageSider" hide-trigger collapsible :collapsed-width="0" v-model="isCollapsed" :width="320" class="home-sider">
          <div :class="menuitemClasses">
            <sider-user-info v-if="!isCollapsed"></sider-user-info>
          </div>
      </Sider>
  </Layout>
</div>
</template>
<script>
import blogHeader from './components/blogHeader'
import blogFooter from './components/blogFooter'
import siderUserInfo from './components/siderUserInfo'
export default {
  components: {
    blogHeader,
    blogFooter,
    siderUserInfo
  },
  data () {
    return {
        isCollapsed: true,
    }
  },
  async created () {
    await this.getUserInfo()
    this.isCollapsed = this.user ? false : true
    if (this.user) {
      this.Cookies.set('user', this.user, { expires: 7 })
    }
  },
  computed: {
    rotateIcon () {
        return [
            'menu-icon',
            this.isCollapsed ? 'rotate-icon' : ''
        ];
    },
    menuitemClasses () {
        return [
            'page-sider',
            this.isCollapsed ? 'collapsed-menu' : ''
        ]
    },
    user () {
        return this.Cookies.get('user') || this.$route.query.username || ''
    }
  },
  methods: {
    getUserInfo () {
      if (this.user) {
        return this.Common.axios('/api/signin/getUserInfo', { username: this.user }).then(res => {
          let result = res.data.data
          localStorage.setItem('user', JSON.stringify(result))
          this.$store.commit('updateUserName', this.user)
          this.$store.commit('updateUserInfo', { page_num: result.page_num, draft_num: result.draft_num, comment_num: result.comment_num, avatar: result.avatar })
        })
      }
    },
    collapsedSider () { // 侧边栏显示切换
        this.$refs.pageSider.toggleCollapse()
    },
    handleRouter (name) { // 路由跳转
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
  transition: all .3s;
}
.rotate-icon {
  transform: rotate(-90deg);
}
.pagination {
  margin: 120px 0;
}

.main-content {
  margin: 80px auto 0;
}
.main-footer {
  margin: 0 auto;
  padding-left: 0px !important;
}
@media (max-width: 991px) {
  .home-sider, .icon-wrapper {
    display: none;
  }
}
@media (max-width: 767px) {
  .main-content, .main-footer {
    margin: 20px 20px;
    width: auto;
  }
 }
 @media (max-width: 1600px) {
   .main-content, .main-footer {
    width: 85%;
    max-width: 700px;
  }
 }
 @media (min-width: 1600px) {
  .main-content, .main-footer {
    // margin: 20px 20px;
    width: 900px;
  }
 }
</style>


