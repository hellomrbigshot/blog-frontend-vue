<template>
    <section>
        <div class="user-info">
            <div class="user-avatar">
                <img :src="'/api/signin/avatar?file_id='+user.avatar" alt="头像" class="user-avatar-img">
            </div>
            <div class="user-info-desc">
                <div class="user-info-name">
                    <h2>{{ user.username }}</h2>
                    <Icon class="gender-icon" size="20" :type="gender_mapping[user.gender].type" :color="gender_mapping[user.gender].color"></Icon>
                    <Icon class="edit-icon" size="18" type="edit" color="#ccc" v-if="cur_username === username"></Icon>
                </div>
                <div class="user-info-bio">
                    {{ user.bio }}
                </div>
            </div>
        </div>
        <div class="user-page-list">
            <h1 :style="{ fontSize: '20px', color: '#555', fontWeight: '500' }">相关文章</h1>
            <page-list :page-list="pageList"></page-list>
        </div>
        <div class="pagination">
            <new-page :total="total" v-if="pageSize<total"></new-page>
        </div>
    </section>
</template>

<script>
import pageList from '../components/pageList'
export default {
  components: {
    pageList
  },
  data() {
    return {
      cur_username: this.Cookies.get('user'),
      username: this.$route.params.username,
      total: 0,
      page: 1,
      pageSize: 10,
      pageList: [],
      user: {
        avatar: '',
        gender: 'm'
      },
      gender_mapping: {
        m: {
          type: 'male',
          color: '#00BFFF'
        },
        f: {
          type: 'female',
          color: '#FF69B4'
        },
        x: {
          type: 'person',
          color: '#cccccc'
        }
      }
    }
  },
  mounted() {
    this.getUserDetail()
    this.getPageList()
  },
  methods: {
    getUserDetail() {
      this.Common.axios('/api/user/detail', { username: this.username }).then(
        res => {
          if (res.data.code === 'OK') {
            this.user = res.data.data
          }
        }
      )
    },
    getPageList() {
      const post_data = {
        type: 'create_user',
        status: 'normal',
        content: this.username,
        pageSize: this.pageSize,
        page: this.page
      }
      this.Common.axios('/api/page/pagelist', post_data).then(res => {
        if (res.data.code === 'OK') {
          this.pageList = res.data.data.result
          this.total = res.data.data.total
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.user-info {
  overflow: hidden;
  .user-avatar {
    float: left;
    .user-avatar-img {
      width: 140px;
      height: 140px;
      padding: 2px;
      border: 2px solid #ccc;
    }
  }
  .user-info-desc {
    float: left;
    margin-left: 20px;
    .user-info-name {
      color: #555;
      h2 {
        font-size: 26px;
        display: inline;
      }
      .gender-icon {
        margin-left: 5px;
        // margin-bottom: 5px;
      }
      .edit-icon {
        &:hover {
          color: #222 !important;
          cursor: pointer;
        }
      }
    }

    .user-info-bio {
      font-size: 14px;
      margin-top: 15px;
      color: #ccc;
    }
  }
}
.user-page-list {
    margin-top: 30px;
}
</style>

