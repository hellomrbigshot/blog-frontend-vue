<template>
    <p :style="{textAlign: 'center'}">备案号：{{ ICP }}<a class="github-link" href="https://github.com/hellomrbigshot/VueExpressBlog"><Icon type="social-github" :size="15"></Icon></a></p>
</template>

<script>
export default {
    data () {
        return {
            ICP: '浙ICP备18011593号-1'
        }
    }
}
</script>
<style lang="scss" scoped>
.github-link {
    color: #495060;
    &:hover {
        color: #000;
    }
}
</style>
