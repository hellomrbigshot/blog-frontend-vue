<template>
  <div class="layout">
    <Layout>
      <Sider
        hide-trigger
        :style="{height: '100vh'}"
      >
        <div class="sider-desc">
          <h1>
            <a
              :style="{color: '#fff'}"
              @click="$router.push({name: 'dashboard'})"
            >管理员后台</a>
          </h1>
        </div>
        <Menu
          active-name="1-2"
          theme="dark"
          width="auto"
          accordion
          @on-select="menuChange"
        >
          <template v-for="(route, i) in routes">
            <Submenu
              v-if="route.meta && route.meta.sidebar"
              :key="i"
              :name="route.name"
            >
              <template slot="title">
                <Icon :type="route.meta.icon"/>
                {{ route.meta.title }}
              </template>
              <template v-for="(child, j) in route.children">
                <MenuItem
                  v-if="child.meta && child.meta.sidebar"
                  :name="child.name"
                  :key="j"
                >
                {{ child.meta.title }}
                </MenuItem>
              </template>
            </Submenu>
          </template>
        </Menu>
      </Sider>
      <Layout>
        <Header class="admin-header">
          <Breadcrumb class="user-breadcrumb">
            <BreadcrumbItem
              v-for="(item, i) in $router.currentRoute.matched"
              :key="i"
            >{{ item.name }}</BreadcrumbItem>
          </Breadcrumb>
          <div class="user-dropdown-menu">
            <Dropdown
              :style="{lineHeight: '1.5'}"
              @on-click="handleClickUserDropDown"
            >
              <a href="javascript:void(0)">
                {{user}}
                <Icon type="arrow-down-b"/>
              </a>
              <DropdownMenu slot="list">
                <DropdownItem name="ownSpace">个人中心</DropdownItem>
                <DropdownItem name="loginout">退出</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </Header>
        <Content :style="{margin: '24px', minHeight: '280px', background: '#fff', padding: '20px'}">
          <keep-alive>
            <router-view :key="$route.fullPath"/>
          </keep-alive>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
export default {
  computed: {
    routes () {
      return this.$store.state.routers.map(item => {
        item.meta = item.meta || {}
        return item
      })
    },
    user () {
      return this.Cookies.get('user') || ''
    }
  },
  methods: {
    menuChange (name) {
      this.$router.push({
        name
      })
    },
    handleClickUserDropDown (name) {
      if (name === 'loginout') {
        this.Common.axios('/api/signout').then(res => {
          this.Cookies.remove('user')
          this.Cookies.remove('token')
          this.Cookies.remove('refreshToken')
          location.reload()
        })
      }
    }
  }
}
</script>
<style scoped>
.layout {
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.user-dropdown-menu {
  position: absolute;
  right: 30px;
}
.user-breadcrumb {
  position: absolute;
  left: 30px;
}
.sider-desc {
  color: #fff;
  height: 64px;
  line-height: 64px;
  text-align: center;
}
.admin-header {
  background: #fff;
  box-shadow: 0 2px 3px 2px rgba(0,0,0,0.1);
  position: relative;
}
</style>
