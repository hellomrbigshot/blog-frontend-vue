<template>
  <div class="layout">
    <Layout>
        <Sider hide-trigger>
            <Menu active-name="1-2" theme="dark" width="auto" accordion @on-select="menuChange" :style="{height: '100vh'}">
                <Submenu v-for="(route, i) in routes.children" :name="route.name" :key="i">
                    <template slot="title">
                        <Icon type="ios-navigate"></Icon>
                        {{ route.title }}
                    </template>
                    <MenuItem v-for="(child, j) in route.children" :name="child.name" :key="j">
                        {{ child.title }}
                    </MenuItem>
                </Submenu>
            </Menu>
        </Sider>
        <Layout>
            <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,0.1)'}">
                <Breadcrumb>
                    <BreadcrumbItem v-for="(item, i) in $router.currentRoute.matched" :key="i">{{ item.name }}</BreadcrumbItem>
                </Breadcrumb>
            </Header>
            <Content :style="{margin: '24px', minHeight: '280px', background: '#fff'}">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </Content>
        </Layout>
    </Layout>
  </div>
</template>
<script>
export default {
    data () {
        return {
        }
    },
    computed: {
        routes () {
            return this.$store.state.admin.routers
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
    }
}
</script>
<style scoped>
.layout{
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
</style>