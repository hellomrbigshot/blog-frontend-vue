<template>
    <div v-if="comments.length" :style="{ marginBottom: '50px' }">
        <p :style="{ fontSize: '20px' }">留言板：</p>
        <article v-for="comment in comments" class="article-comment">
            <div class="comment-content">{{ comment.comment }}</div>
            <div class="comment-info">
                <router-link :to="{ name: 'userDetail', params: { username:  comment.create_user }}"><span class="comment-info-user">{{ comment.create_user }}</span></router-link>
                <span>{{ comment.create_time }}</span>
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
  mounted() {}
}
</script>

<style lang="scss" scoped>
.article-comment {
    font-size: 14px;
    margin-top: 15px;
    border-bottom: 1px dashed #cdcdcd;
    padding: 8px 2%;
    .comment-content {
        word-break: break-all;
        // white-space: nowrap;
    }
    .comment-info {
        text-align: right;
        margin-right: 5%;
        font-size: 12px;
        margin-top: 10px;
        .comment-info-user {
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
