<template>
    <div class="header-inner">
        <ul class="menu">
            <li v-for="(route, i) in routes.children" :key="i" class="menu-item">
                <router-link :to="{name: route.name}">{{ route.meta.title }}</router-link>
            </li>
        </ul>
    </div>
</template>
<<script>
    export default {
        data () {
            return {

            } 
        },
        computed: {
            routes () {
                return this.$store.state.normal.routers
            }
        }
    }
</script>
<style lang="scss" scopeed>
.header-inner {
    width: 700px;
    margin: 0 auto;
    padding: 40px 0;
    margin-bottom: 80px;
    ul.menu {
        list-style: none;
        li.menu-item {
            float: left;
            font-size: 13px;
            a {
                color: #222;
                padding: 5px 10px;
                line-height: 1.5;
            }
            
        }
    }
}
</style>
