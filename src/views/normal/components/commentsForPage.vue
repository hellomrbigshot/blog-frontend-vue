<template>
  <div v-if="comments.length" :style="{ marginBottom: '50px' }">
    <p :style="{ fontSize: '20px' }">留言板：</p>
    <article v-for="(comment, i) in comments" :key="i" class="article-comment">
      <div class="comment-info">
        <div class="comment-info-user-wrapper">
          <router-link :to="{ name: 'userDetail', params: { username:  comment.create_user }}">
            <span class="comment-info-user">{{ comment.create_user }}</span>
          </router-link>
          <template v-if="comment.reply_user">回复
            <router-link :to="{ name: 'userDetail', params: { username:  comment.reply_user }}">
              <span class="comment-info-user">{{ comment.reply_user }}</span>
            </router-link>
          </template>
        </div>
        <div class="comment-info-time-wrapper">{{ Common.formatTime(comment.create_time, '3') }}</div>
      </div>
      <div class="comment-content">{{ comment.content }}</div>
      <div style="overflow: auto; margin-top: 10px;">
        <span @click="triggerComment(comment.create_user)" style="font-size: 12px; float: right;">
          <a href="#commentInput">回复</a>
        </span>
      </div>
    </article>
  </div>
</template>

<script>
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
    triggerComment(user) {
      setTimeout(() => {
        this.$emit("on-reply", user);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.article-comment {
  font-size: 14px;
  margin-top: 15px;
  border-bottom: 1px dashed #cdcdcd;
  padding: 8px 2%;
  .comment-content {
    word-break: break-all;
  }
  .comment-info {
    text-align: right;
    font-size: 14px;
    margin: 10px 0 20px 0;
    overflow: hidden;
    &-user-wrapper {
      float: left;
    }
    &-time-wrapper {
      float: right;
    }
    &-user {
      color: #555;
      margin-right: 5px;
      border-bottom: 1px solid #fff;
      // font-weight: bold;
      &:hover {
        color: #222;
        border-bottom-color: #222;
      }
    }
  }
}
</style>
