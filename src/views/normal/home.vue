<template>
<div class="layout">
  <div class="icon-wrapper">
    <div class="single-icon-wrapper" v-if="user">
      <Icon @click.native="collapsedSider" :class="rotateIcon" color="#fff" type="navicon-round" size="22"></Icon>
    </div>
    <div class="single-icon-wrapper">
      <Icon @click.native="bodyScrollTop" color="#fff" type="arrow-up-b" size="22"></Icon>
    </div>
  </div>
  <Layout>
      <Layout :style="{minHeight: '100vh'}">
          <Header :style="{padding: 0, background: '#f5f5f5', height: 'auto'}" class="layout-header-bar">
            <blog-header @on-change="handleRouter"></blog-header>
          </Header>
          <Content :style="{background: '#fff', minHeight: '260px'}">
              <router-view :style="{margin: '80px auto 0', width: '85%', maxWidth: '900px'}"></router-view>
          </Content>
          <Footer :style="{padding: '40px 0', margin: '0 auto', width: '85%', maxWidth: '900px'}">
            <blog-footer></blog-footer>
          </Footer>
      </Layout>
      <Sider ref="pageSider" hide-trigger collapsible :collapsed-width="0" v-model="isCollapsed" :width="320" >
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
    this.isCollapsed = this.user?false:true
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
          if (res.data.code === 'OK') {
            let result = res.data.data
            localStorage.setItem('user', JSON.stringify(result))
            this.$store.commit('updateUserName', this.user)
            this.$store.commit('updateUserInfo', { page_num: result.page_num, draft_num: result.draft_num, comment_num: result.comment_num, avatar: result.avatar })
          }
        })
      }
    },
    collapsedSider () { // 侧边栏显示切换
        this.$refs.pageSider.toggleCollapse()
    },
    bodyScrollTop () {  // 滚动到顶端
      let timer = setInterval(() => {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        let speed = Math.floor(-scrollTop/4)
        document.documentElement.scrollTop = scrollTop + speed
        if (scrollTop === 0) {
            clearInterval(timer)
        }
      }, 30)
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
</style>


