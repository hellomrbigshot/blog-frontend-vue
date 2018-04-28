<template>
    <div class="header-inner">
        <div class="site-meta">
            <router-link :to="{name: 'normalPageList'}" class="brand">
                <span class="logo-line-before"></span>
                <span class="site-title">My Blog</span>
                <span class="logo-line-after"></span>
            </router-link>
        </div>
        <div class="site-nav">
            <ul class="menu">
                <li v-for="(route, i) in routes.children" :key="i" class="menu-item" v-if="route.meta.inHeaderList">
                    <router-link :to="{name: route.name}">{{ route.meta.title }}</router-link>
                </li>
            </ul>
            <div class="site-search">
                <form class="site-search-form">
                    <Icon type="search" class="search-icon" size="22" color="#222"></Icon>
                    <input class="search-input"></input>
                </form>
            </div>
        </div>
        
    </div>
</template>
<<script>
    export default {
        data () {
            return {

            } 
        },
        computed: {
            routes () {
                return this.$store.state.normal.routers
            }
        }
    }
</script>
<style lang="scss">
@import './blogHeader.scss'
</style>
