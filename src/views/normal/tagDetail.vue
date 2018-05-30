<template>
    <section>
        <div class="tag-title">
            <h2>
                {{ name }}
                <small>标签</small>
            </h2>
            <div class="tag-desc">{{ detail.description }}</div>
        </div>
        
        <article v-for="(page, i) in pageList" :key="i" class="article">
            <header class="page-header">
                <router-link :to="{ name: 'pageDetail', params: { id: page._id } }">
                    <h1 class="page-title">
                    {{ page.title }}
                    </h1>
                </router-link>
                <div class="page-meta">
                    <time>{{ page.update_date.substring(5, 10) }}</time>
                </div>
            </header>
        </article>
        <div :style="{marginBottom: '50px'}" >
            <new-page v-if="total>pageSize" :total="total" @on-change="pageChange"></new-page>
        </div>
    </section>
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
        },
        pageChange (page) {
            this.page = page
            this.getPageList()
        }
    }
}
</script>

<style lang="scss" scoped>
.tag-title {
    margin: 60px 0;
    position: relative;
    h2 {
        margin: 20px 0 10px 20px;
        font-size: 22px;
        color: #555;
        small {
            color: #bbb;
        }
    }
    &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 16px;
        width: 8px;
        height: 8px;
        margin-left: -4px;
        background: #bbb;
        border-radius: 50%;
    }
    .tag-desc {
        margin-left: 20px;
        font-size: 12px;
    }
}
.article {
    margin: 30px 0;
    box-sizing: content-box;
    position: relative;
    font-size: 14px;
    line-height: 2;
    .page-header {
        border-bottom: 1px dashed #ccc;
        transition: border .2s ease-in-out;
        color: #555;
        &:hover {
            border-bottom-color: #666;
            &:before {
                background: #222;
            }
        }
        &:before {
            box-sizing: content-box;
            content: '';
            position: absolute;
            left: 0;
            top: 12px;
            width: 6px;
            height: 6px;
            margin-left: -4px;
            background: #bbb;
            border-radius: 50%;
            border: 1px solid #fff;
            transition: background .2s ease-in-out;
        }
        .page-title {
            margin: 20px 0 10px 60px;
            font-size: 16px;
            color: #666;
            font-weight: normal;
            line-height: inherit;
            &:after {
                margin-left: 3px;
                opacity: 0.6;
            }
        
        }
        .page-meta {
            position: absolute;
            font-size: 12px;
            top: 5px;
            left: 20px;
        }
    }
    
}
</style>
