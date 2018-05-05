<template>
  <div class="sider-inner">
      <section>
          <div class="site-author">
              <img :src="'/api/signin/avatar?file_id='+user.avatar" alt="" class="site-author-img">
              <p class="site-author-name">{{ user.username }}</p>
          </div>
          <p class="site-description">{{ user.bio }}</p>
          <nav class="user-state">
              <div class="site-item">
                  <router-link :to="{ name: 'normalMyPageList' }">
                      <span class="site-item-count">
                          <count-up 
                            idName="page_num" 
                            countSize="18px" 
                            fontWeight="normal" 
                            color="#999" 
                            :endVal="$store.state.user.page_num"></count-up>
                      </span>
                      <span class="site-item-name">文章</span>
                  </router-link>
              </div>
              <div class="site-item">
                  <router-link :to="{ name: 'normalMyPageList' }">
                      <span class="site-item-count">
                          <count-up
                            idName="draft_num" 
                            countSize="18px" 
                            fontWeight="normal" 
                            color="#999"
                            :endVal="$store.state.user.draft_num"></count-up>
                      </span>
                      <span class="site-item-name">草稿</span>
                  </router-link>
              </div>
              <div class="site-item">
                  <router-link :to="{ name: 'normalMyPageList' }">
                      <span class="site-item-count">{{ 0 }}</span>
                      <span class="site-item-name">标签</span>
                  </router-link>
              </div>
          </nav>
          <div class="site-operate">
              <router-link :to="{name: 'normalNew'}">写文章</router-link>
              <a @click="signout">注销</a>
          </div>
      </section>
  </div>
</template>
<script>
import countUp from '../../admin/components/countUp'
export default {
    props: {

    },
    components: {
        countUp
    },
    data () {
        return {
            user: JSON.parse(localStorage.getItem('user'))
        }
    },
    methods: {
        signout () {
            this.Common.axios('/api/signout').then(res => {
                if (res.data.code === 'OK') {
                    this.Cookies.remove('user')
                    localStorage.removeItem('user')
                    this.$router.push({ name: 'normalPageList' })
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.sider-inner {
    padding: 20px 10px;
    position: relative;
    text-align: center;
    color: #999;
    a {
        color: #999;
    }
    .site-author {
        display: block;
        img.site-author-img {
            max-width: 96px;
            max-height: 96px;
            margin: 0 auto;  
            border: 2px solid #333;
            height: auto;
            padding: 2px; 
        }
        p.site-author-name {
            margin: 5px 0 0;
            color: #f5f5f5;
            font-size: 14px;
        }
    }
    .site-description {
        margin: 5px 0 25px;
        font-size: 14px;
        text-align: center;
        color: #555;
    }
    .user-state {
        line-height: 1.4;
        .site-item {
            padding: 0 15px;
            display: inline-block;
            .site-item-count, .site-item-name {
                display: block;
                text-align: center;
                
            }
            .site-item-count {
                font-size: 18px;
            }
            .site-item-name {
                font-size: 12px;
            }
            &:nth-child(2), &:nth-child(3) {
                border-left: 1px solid #333;
            }
            &:hover {
                a {
                    color: #fff;
                }
            }
        }
    }
    .site-operate {
        margin-top: 20px;
        a:hover {
            color: #fff;
        }
    }
}
</style>
