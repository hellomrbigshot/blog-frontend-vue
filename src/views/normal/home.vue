<template>
<div class="layout">
  <div class="icon-wrapper">
    <div class="single-icon-wrapper">
      <Icon @click.native="collapsedSider" :class="rotateIcon" color="#fff" type="navicon-round" size="22"></Icon>
    </div>
    <div class="single-icon-wrapper">
      <Icon @click.native="" color="#fff" type="arrow-up-b" size="22"></Icon>
    </div>
  </div>
  <Layout>
      <Layout>
          <Header :style="{padding: 0, background: '#f5f5f5', height: '130px'}" class="layout-header-bar">
              
            <blog-header></blog-header>
          </Header>
          <Content :style="{margin: '20px', background: '#fff', minHeight: '260px'}">
              <router-view></router-view>
          </Content>
      </Layout>
      <Sider ref="pageSider" hide-trigger collapsible :collapsed-width="0" v-model="isCollapsed" :class="menuitemClasses">
          
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
          isCollapsed: false
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
      }
  },
  methods: {
    collapsedSider () {
        this.$refs.pageSider.toggleCollapse();
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
  // width: 320px !important;
  // min-width: 320px !important;
  // max-width: 320px !important;
  //  transition: width 2s ease 2s;
}
.collapsed-menu {
    width: 0 !important;
    min-width: 0 !important;
    max-width: 0 !important;
    transition: width 5s ease 5s;
}
</style>


