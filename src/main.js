// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {router} from './router'
import store from './vuex'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import {Common} from '@/assets/js/common.js'

import Cookies from 'js-cookie'

import hljs from 'highlight.js'
import marked from 'marked'
import 'highlight.js/styles/solarized-light.css'
hljs.highlightCode =   function () { // 自定义 highlightCode 方法，循环执行方法
    let blocks = document.querySelectorAll('pre code')
    let dom = Array.prototype.slice.call(blocks)
    dom.forEach(ele => {
        hljs.highlightBlock(ele)
    })
}
Vue.use(iView)
Vue.prototype.Common = Common
Vue.prototype.Cookies = Cookies
Vue.prototype.marked = marked
Vue.prototype.hljs = hljs

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
