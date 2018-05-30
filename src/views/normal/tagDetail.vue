<template>
    <div>

    </div>
</template>

<script>
export default {
    data () {
        return {
            name: this.$route.params.name,
            page: 1,
            pageSize: 10,
            total: 0,
            detail: {

            },
            pageList: []
        }
    },
    mounted () {
        this.getTagDetail()
        this.getPageList()
    },
    methods: {
        getPageList () {
            this.Common.axios('/api/page/pagelist', {
                type: 'tag',
                content: this.name,
                page: this.page,
                pageSize: this.pageSize,
                status: 'normal'
            }).then(res => {
                if (res.data.code === 'OK') {
                    this.pageList = res.data.data.result
                    this.total = res.data.data.total
                } else {
                    this.$Message.error(res.data.data)
                }
            })
        },
        getTagDetail () {
            this.Common.axios('/api/tag/tagdetail', { name: this.name })
                .then(res => {
                    if (res.data.code === 'OK') {
                        this.detail = res.data.data
                    } else {
                        this.$Message.error(res.data.data)
                    }
                })
        }
    }
}
</script>

<style>

</style>
