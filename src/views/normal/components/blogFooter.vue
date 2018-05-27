<template>
    <p :style="{textAlign: 'center'}">备案号：{{ ICP }}</p>
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