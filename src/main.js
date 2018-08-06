import Vue from 'vue'
import App from './App'
import {router} from './router'
import store from './vuex'
import iView from 'iview'
import { Button, Select, Input, Switch, Option, Form, FormItem } from 'element-ui'
import {Common} from '@/assets/js/common.js'

import Cookies from 'js-cookie'
import newPage from './views/normal/components/newPage'
import '@/assets/css/main.scss'

import marked from 'marked'


hljs.highlightCode =  () => { // 自定义 highlightCode 方法，循环执行方法
    let blocks = document.querySelectorAll('pre code')
    let dom = Array.prototype.slice.call(blocks)
    dom.forEach(ele => {
        hljs.highlightBlock(ele)
    })
}
Vue.use(iView)
Vue.component('el-select', Select)
Vue.component('el-option', Option)
Vue.component('el-button', Button)
Vue.component('el-input', Input)
Vue.component('el-switch', Switch)
Vue.component('el-form', Form)
Vue.component('el-form-item', FormItem)
Vue.prototype.Common = Common
Vue.prototype.Cookies = Cookies
Vue.prototype.marked = marked
Vue.prototype.hljs = hljs
Vue.component('new-page', newPage)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
