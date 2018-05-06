<template>
<div>
    <div v-for="(draft, index) in draft_list">
        <article>
            <header>
                <router-link :to="{name: 'editPage', params: {id: draft._id}}">
                    <h1 class="page-title">{{ (index + 1) + '.' + draft.title }}</h1>
                </router-link>
                <div class="page-info">
                    <span class="create-time">创建于 <time>{{ draft.create_date.substring(0,10) }}</time></span>
                    <!-- <span class="create-user">&nbsp;|&nbsp;作者 
                        <router-link :to="{name: 'userDetail', params :{username:  draft.create_user}}">
                            <span class="user-span">{{ draft.create_user }}</span>  
                        </router-link></span>
                    <span>&nbsp;|&nbsp;</span> -->
                </div>
            </header>
        </article>
    </div>
</div>

</template>

<script>
export default {
  data () {
    return {
      draft_list: []
    }
  },
  mounted () {
    this.Common.axios('/api/page/limitpagelist', { type: 'creator', content: this.Cookies.get('user'), status: 'draft' }).then(res => {
      if (res.data.code === 'OK') {
        this.draft_list = res.data.data
      }
    })
    
  }
}
</script>

<style lang="scss" scoped>
article {
    header {
        font-family: Lato, "PingFang SC", "Microsoft YaHei", sans-serif;
        .page-title {
            font-weight: 400;
            font-size: 20px;
            margin: 20px 0 10px;
            width: auto;
            display: inline-block;
            color: #000;
            border-bottom: 2px solid #fff;
            &:hover {
                border-bottom: 2px solid #000;
            }
        }
        .page-info {
            color: #999;
            font-size: 12px;
            margin: 0 0 20px;
            .user-span {
                color: #999;
                display: inline-block;
                border-bottom: 1px solid #fff;
                &:hover {
                    border-bottom: 1px solid #999;
                }
            }
        }
    }
    margin-bottom: 120px;
    // max-height: 300px;
    // overflow: hidden;
}
</style>
