<template>
  <div>

  </div>
</template>

<script>
export default {
    data () {
        return {
            username: this.$route.params.username
        }
    },
    mounted () {
        this.getUserDetail()
    },
    methods: {
        getUserDetail () {
            this.Common.axios('/api/user/detail', { username: this.username }).then(res => {
                
            })
        }
    }
}
</script>
