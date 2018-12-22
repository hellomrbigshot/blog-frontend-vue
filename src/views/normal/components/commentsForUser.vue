<template>
    <div v-if="comments.length" :style="{ marginBottom: '50px' }">
        <article v-for="comment in comments" class="article-comment">
            <div class="comment-info">
                <span class="comment-user" v-if="type === 'create_user' || comment.create_user === comment.to_user">我说：</span>
                <span class="comment-user" v-else>
                    <router-link :to="{ name: 'userDetail', params: { username: comment.create_user }}">{{ comment.create_user }}</router-link> 对我说：
                </span>
                <span class="comment-time">{{ Common.formatTime(comment.create_time, '3') }}</span>
            </div>
            <div class="comment-content">{{ comment.content }}</div>
            <div class="comment-page">
                <router-link :to="{ name: 'pageDetail', params: { id: comment.page_id } }">
                    {{ comment.page_title }}
                </router-link>
            </div>
        </article>
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
}
</script>

<style lang="scss" scoped>
.article-comment {
    font-size: 14px;
    margin-top: 15px;
    border-bottom: 1px dashed #cdcdcd;
    padding: 8px 2%;
    .comment-info {
        font-size: 12px;
        color: #999;
        margin-bottom: 5px;
        position: relative;
        .comment-time {
            position: absolute;
            right: 0;
        }
    }
    .comment-content {
        word-break: break-all;
        font-size: 14px;
    }
    .comment-page {
        margin: 10px 0;
        padding: 10px;
        border: 1px solid #e6e6e6;
        a {
            color: #555;
            &:hover {
                color: #222;
            }
        }
    }
}
</style>
