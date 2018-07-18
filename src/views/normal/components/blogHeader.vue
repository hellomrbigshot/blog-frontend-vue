<template>
    <div class="header-inner">
        <div class="site-meta">
            <router-link :to="{name: 'normalPageList'}" class="brand">
                <span class="logo-line-before"></span>
                <span class="site-title">世说新语</span>
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
                <div class="site-search-form">
                    <a :class="['search-icon', {'active-search-icon': isFocus}]"><Icon type="search" size="16" ref="searchIcon" @click="searchPage"></Icon></a>
                    <input class="search-input" v-model="keywords" @focus="isFocus=true" @blur="isFocus=false"></input>
                </div>
            </div>
        </div>
        
    </div>
</template>
<<script>
import { bus } from '../../../bus/index'
    export default {
        data () {
            return {
                isFocus: false,
                keywords: ''
            } 
        },
        computed: {
            routes () {
                return this.$store.state.normal.routers
            }
        },
        methods: {
            searchPage () {
                // this.$router.push({ name: 'normalPageList' })
                bus.$emit('searchPage', this.keywords)
            }
        }
    }
</script>
<style lang="scss">
@import './blogHeader.scss'
</style>
