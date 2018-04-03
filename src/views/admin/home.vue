<template>
  <div>
    <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo">!!!</div>
                    <div class="layout-nav">
                        <div></div>
                        <div style="background: #fff">{{ user }}</div>
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Sider hide-trigger :style="{background: '#fff'}">
                    <Menu active-name="1-2" theme="light" width="auto" accordion @on-select="menuChange">
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
                <Layout :style="{padding: '0 24px 24px'}">
                    <Breadcrumb :style="{margin: '24px 0'}">
                        <BreadcrumbItem v-for="(item, i) in $router.currentRoute.matched" :key="i">{{ item.name }}</BreadcrumbItem>
                    </Breadcrumb>
                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                        <keep-alive>
                            <router-view></router-view>
                        </keep-alive>
                    </Content>
                </Layout>
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
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 200px;
    margin: 0 auto;
    margin-right: 20px;
}
</style>