<template>
  <div class="header-inner">
    <div class="site-meta">
      <router-link
        class="brand"
        :to="{name: 'Home'}"
      >
        <span class="logo-line-before"/>
        <span class="site-title">
          <img
            class="site-logo"
            :src="logo"
          />
        </span>
        <span class="logo-line-after"/>
      </router-link>
    </div>
    <transition name="slide-fade">
      <div
        v-if="showUl"
        class="site-nav"
      >
        <ul class="menu">
          <template v-for="(route, i) in routes">
            <li
              v-if="route.meta.inHeaderList"
              :key="i"
              class="menu-item"
            >
              <router-link :to="{name: route.name}">{{ route.meta.title }}</router-link>
            </li>
          </template>
          <li class="menu-item">
            <a href="https://hellomrbigbigshot.xyz">
              <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-React"/>
              </svg> 版本
            </a>
          </li>
        </ul>
        <div :class="['site-search', {'active': isFocus}]">
          <div class="site-search-form">
            <input
              v-model.lazy="keywords"
              class="search-input"
              placeholder="搜索"
              @focus="isFocus=true"
              @blur="isFocus=false"
              @keyup.enter="searchPage"
            />
            <Icon
              ref="searchIcon"
              :class="['search-icon']"
              type="md-search"
              size="22"
              @click="searchPage"
            />
          </div>
        </div>
      </div>
    </transition>
    <div class="site-addition">
      <div v-if="userName">
        <AvatarPart :username="userName" style="margin-right: 10px;"/>
      </div>
      <template v-else>
        <router-link :to="{ name: 'Login' }" class="btn login">登录</router-link>
        <router-link :to="{ name: 'Register' }" class="btn reg">注册</router-link>
      </template>
      <router-link :to="{ name: 'PageNew' }" class="btn write">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-yumaobi"></use>
        </svg>
        写文章
      </router-link>
    </div>
  </div>
</template>
<script>
import { bus } from '@/bus/index'
export default {
  components: {
    AvatarPart: () => import('index/components/AvatarPart')
  },
  data () {
    return {
      isFocus: false,
      keywords: '',
      logo: require('@/assets/img/logo_black_transparent.png'),
      showUl: false
    }
  },
  computed: {
    routes () {
      return this.$store.state.normal.routers.children
    },
    userName () {
      return this.$store.state.user && this.$store.state.user.username
    }
  },
  mounted () {
    setTimeout(() => {
      this.showUl = true
    }, 500)
  },
  methods: {
    searchPage () {
      bus.$emit('searchPage', this.keywords)
    }
  }
}
</script>
<style lang="scss">
@import "./index.scss";
</style>
