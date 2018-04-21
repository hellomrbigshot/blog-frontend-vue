<template>
  <div class="sider-inner">
      <section>
          <div class="site-author">
              <img :src="'/api/signin/avatar?file_id='+user.avatar" alt="" class="site-author-img">
              <p class="site-author-name">{{ user.username }}</p>
          </div>
          <p class="site-description">{{ user.bio }}</p>
          <nav class="user-state"></nav>
      </section>
  </div>
</template>
<script>
export default {
    props: {

    },
    data () {
        return {
            user: JSON.parse(localStorage.getItem('user'))
        }
    }
}
</script>

<style lang="scss">
.sider-inner {
    padding: 20px 10px;
    position: relative;
    text-align: center;
    color: #999;

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
}
</style>
