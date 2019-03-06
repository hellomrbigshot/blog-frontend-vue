<template>
  <div v-if="comments.length" :style="{ marginBottom: '50px' }">
    <p :style="{ fontSize: '20px' }">留言板：</p>
    <div v-for="(comment, i) in comments" :key="i" class="article-comment">
      <div class="comment-avatar">
        <router-link class="comment-avatar-img" :to="{ name: 'userDetail', params: { username:  comment.create_user }}">
          <img :src="`/api/file/avatar/user/?username=${comment.create_user}`" width="36" height="36" alt="avatar">
        </router-link>
        <div class="grey" style="text-align: center;">{{ comments.length - i }}楼</div>
      </div>
      <div class="comment-content">
        <div class="comment-content-time">
          <router-link class="user" :to="{ name: 'userDetail', params: { username:  comment.create_user }}">
            <span class="comment-info-user">{{ comment.create_user }}</span>
          </router-link>
          <div class="time grey">{{ Common.formatTime(comment.create_time, '3') }}</div>
        </div>
        <div class="comment-blockquote" v-if="comment.reply_user">
          <div class="comment-blockquote-content">
            <router-link :to="{ name: 'userDetail', params: { username: comment.reply_user }}">{{ comment.reply_user }}</router-link>
            ：{{ comment.reply_content }}
          </div>
        </div>
        <div>{{ comment.content }}</div>
        <div class="comment-action" style="overflow: auto;">
          <div @click="triggerComment(comment.create_user, comment.content)">
            <a href="#commentInput" class="comment-action-item grey">回复</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import default_img from '@/assets/logo.png'
export default {
  props: {
    comments: {
      type: Array
    }
  },
  mounted() {},
  computed: {
    current_user() {
      return this.$store.state.user.username;
    }
  },
  methods: {
    triggerComment(user, content) {
      setTimeout(() => {
        this.$emit("on-reply", user, content);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.grey {
  color: #999;
  font-size: 12px;
}
.article-comment {
  font-size: 14px;
  margin-top: 15px;
  border-bottom: 1px dashed #cdcdcd;
  padding: 8px 2%;
  overflow: hidden;
  .comment-avatar {
    float: left;
    width: 36px;
    margin-right: 16px;
    &-img {
      width: 36px;
      height: 36px;
      margin-bottom: 10px;
      img {
        border-radius: 50%;
      }
    }
  }
  .comment-content {
    float: left;
    width: calc(100% - 52px);
    &-time {
      line-height: 36px;
      .user {
        font-size: 14px;
        &:hover {
          text-decoration: underline;
        }
      }
      .time {
        float: right;
      }
    }
    .comment-blockquote {
      padding-top: 8px;
      margin-bottom: 10px;
      &-content {
        background-color: #f8f8f8;
        padding: 15px 19px;
        border: 1px solid #dcdcdc;
      }
    }
    .comment-action {
      overflow: auto;
      &-item {
        float: right;
        &:hover {
          cursor: pointer;
          color: #dd554f;
        }
      }
    }
  }
}
</style>
