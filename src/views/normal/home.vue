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
            <blog-header></blog-header>
          </Header>
          <Content :style="{background: '#fff', minHeight: '260px'}">
              <router-view></router-view>
          </Content>
      </Layout>
      <Sider ref="pageSider" hide-trigger collapsible :collapsed-width="0" v-model="isCollapsed" :width="320">
          <div :class="menuitemClasses"></div>
      </Sider>
  </Layout>
</div>
</template>
<script>
import blogHeader from './components/blogHeader'
export default {
  components: {
    blogHeader
  },
  data () {
      return {
          isCollapsed: true
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
          return this.Cookies.get('user') || ''
      }
  },
  methods: {
    collapsedSider () { // 侧边栏显示切换
        this.$refs.pageSider.toggleCollapse()
    },
    bodyScrollTop () {  // 滚动到顶端
      let time = setInterval(() => {
        document.body.scrollTop = document.body.scrollTop - 50;
        if (document.body.scrollTop === 0) {
            clearInterval(time)
        }
      }, 1)
    }
  }
}
</script>
<style lang="scss">
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
</style>


