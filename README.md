# vue-express-blog

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## 开发文档
### 所有请求方式均用 post
### 详情页

前端路由 path: xxx/:id
router-link :to="{ name: a, params: { id: b } }"
后端接口 getxxxById
