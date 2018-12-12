<template>
    <div class="header-inner">
        <div class="site-meta">
            <router-link :to="{name: 'normalPageList'}" class="brand">
                <span class="logo-line-before"></span>
                <span class="site-title">
                    <img :src="logo" class="site-logo"/>
                </span>
                <span class="logo-line-after"></span>
            </router-link>
        </div>
        <transition name="slide-fade">
            <div class="site-nav" v-if="show_ul">
                <ul class="menu" >
                    <li v-for="(route, i) in routes.children" :key="i" class="menu-item" v-if="route.meta.inHeaderList">
                        <router-link :to="{name: route.name}">{{ route.meta.title }}</router-link>
                    </li>
                </ul>
                <div class="site-search" >
                    <div class="site-search-form">
                        <a :class="['search-icon', {'active-search-icon': isFocus}]"><Icon type="md-search" size="16" ref="searchIcon" @click="searchPage"></Icon></a>
                        <input class="search-input" v-model="keywords" @focus="isFocus=true" @blur="isFocus=false" @keyup.enter="searchPage"></input>
                    </div>
                </div>
            </div>
        </transition>
        
        
    </div>
</template>
<<script>
import { bus } from '../../../bus/index'
    export default {
        data () {
            return {
                isFocus: false,
                keywords: '',
                logo: require('@/assets/img/logo_black_transparent.png'),
                show_ul: false
            } 
        },
        computed: {
            routes () {
                return this.$store.state.normal.routers
            }
        },
        mounted() {
            setTimeout(() => {
                this.show_ul = true
            }, 500)
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
