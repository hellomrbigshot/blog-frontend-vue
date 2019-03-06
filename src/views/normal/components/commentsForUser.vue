<template>
  <div v-if="comments.length" :style="{ marginBottom: '50px' }">
    <div v-for="(comment, i) in comments" class="article-comment" :key="i">
      <div class="comment-info">
        <div class="comment-avatar">
          <router-link :to="{ name: 'userDetail', params: { username:  comment.create_user }}">
            <img :src="`/api/file/avatar/user/?username=${comment.create_user}`" alt="avatar" width="36px" height="36px">
          </router-link>
        </div>
        <div class="comment-content">
          <div v-if="type==='to_user'" class="comment-content-name">
            <router-link :to="{ name: 'userDetail', params: { username:  comment.create_user }}">{{ comment.create_user }}</router-link>
            <span class="grey">回复我说：</span>
          </div>
          <div>{{ comment.content }}</div>
          <router-link
              :to="{ name: 'pageDetail', params: { id: comment.page_id, hash: comment._id }, hash: comment._id }"
            >
            <div v-if="comment.reply_user" class="comment-comment">
              <router-link :to="{ name: 'userDetail', params: { username:  comment.reply_user }}">
                {{ comment.reply_user }}
              </router-link>：{{ comment.reply_content }}
            </div>
            <div class="comment-page" v-else>{{ comment.page_title }}</div>
          </router-link>
        </div>
        <div class="time grey">{{ Common.formatTime(comment.create_time, '3') }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comments: {
      type: Array
    },
    type: {
      type: String
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
  overflow: auto;
  padding: 8px 2%;
  .comment-info {
    overflow: auto;
  }
  .comment-avatar {
    float: left;
    width: 36px;
    height: 36px;
    margin-right: 16px;
    border-radius: 50%;
    overflow: hidden;
  }
  .comment-content {
    float: left;
    width: calc(100% - 132px);
    overflow: auto;
    &-name {
      line-height: 22px;
    }
    .comment-page, .comment-comment {
      margin: 10px 0;
      padding: 10px;
      border: 1px solid #e6e6e6;
      color: #888;
    }
    .comment-comment {
      background-color: #f8f8f8;
      border-color: #dcdcdc;
    }
    .comment-page {
      &:hover {
        color: #5188a6;
      }
    }
  }
  .time {
    float: right;
    width: 80px;
    text-align: right;
    line-height: 22px;
  }
  
}
</style>
