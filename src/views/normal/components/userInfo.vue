<template>
  <div class="sider-inner">
      <section>
          <div class="site-author">
              <img src="" alt="" class="site-author-img">
              <p class="site-author-name">嘤嘤嘤</p>
          </div>
      </section>
  </div>
</template>
<script>
export default {
    props: {

    },
    data () {
        return {

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
            margin: 0 auto;  
            border: 2px solid #333;
            height: auto;
            padding: 2px; 
        }
        p.site-author-name {
            margin: 5px 0 0;
            color: #f5f5f5;
        }
    }
}
</style>
