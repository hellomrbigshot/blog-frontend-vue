<template>
  <div
    :class="['avatar-wrapper', showMenu ? 'avatar-wrapper-up' : 'avatar-wrapper-down']"
    @mouseenter="handleToggleMenu(true)"
    @mousemove="handleToggleMenu(true)"
    @mouseleave="handleToggleMenu(false)"
  >
    <img class="user-avatar" :src="avatarUrl" alt="avatar"/>
    <div v-if="showMenu" class="avatar-menu-list" @mouseenter="handleToggleMenu(true)" @mouseleave="handleToggleMenu(false)">
      <div v-for="(item, i) in menuList" :key="i" class="avatar-menu-list-item">
        <router-link v-if="item.route" :to="item.route">
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="item.icon"></use>
          </svg>
          <div>{{ item.title }}</div>
        </router-link>
        <a v-else @click="item.click">
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="item.icon"></use>
          </svg>
          <div>{{ item.title }}</div>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AvatarPart',
  props: {
    username: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      menuList: [
        {
          title: '我的主页',
          route: { name: 'UserDetail', params: { username: this.username } },
          icon: 'icon-UserSettings'
        },
        {
          title: '我的文章',
          route: { name: 'PageListForUser' },
          icon: 'icon-UserSettings'
        },
        {
          title: '我的草稿',
          route: { name: 'PageListForDraft' },
          icon: 'icon-draft'
        },
        {
          title: '我的评论',
          route: { name: 'CommentList' },
          icon: 'icon-comment'
        },
        {
          title: '退出',
          icon: 'icon-signout_detail_toil',
          click: () => {
            this.loginOut()
          }
        }
      ],
      showMenu: false
    }
  },
  computed: {
    avatarUrl () {
      return `/api/file/avatar/user/?username=${this.username}`
    }
  },
  methods: {
    handleToggleMenu (value) {
      if (this.showMenu !== value) {
        this.showMenu = value
      }
    },
    loginOut () {
      // 退出登录
      this.Cookies.remove('user')
      this.Cookies.remove('token')
      this.Cookies.remove('refreshToken')
      this.$store.commit('updateUser', { username: '' })
    }
  }
}
</script>
<style lang="scss" scoped>
.avatar-wrapper {
  display: flex;
  position: relative;
  padding: 8px 25px 8px 10px;
  height: 66px;
  &:hover {
    background: #efefef;
  }
}
.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.avatar-wrapper-down, .avatar-wrapper-up {
  &:after {
    content: '';
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    position: absolute;
    right: 5px;
    top: 30px;
  }
}
.avatar-wrapper-down:after {
  border-top: 6px solid #999;
}
.avatar-wrapper-up:after {
  border-bottom: 6px solid #999;
}
.avatar-menu-list {
  position: absolute;
  background: #fff;
  top: 67px;
  left: 0;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 8px;
  border-radius: 5px;
  font-size: 14px;
  width: 160px;
  &-item {
    height: 50px;
    line-height: 50px;
    color: #333;
    &:nth-child(1) {
      margin-top: 5px;
    }
    &:hover {
      background: #f5f5f5;
    }
    a {
      color: #333;
      display: flex;
      align-items: center;
    }
  }
}
</style>
