import Vue from 'vue'
import App from './App'
import store from './vuex'
import { router } from './router'
import { Common } from '@/assets/js/common.js'

import marked from 'marked'
import hljs from 'highlight.js'
import Cookies from 'js-cookie'
import { Select, Option } from 'element'
import iView from 'iview'

import 'iview/dist/styles/iview.css'
import Pagination from './views/normal/components/Pagination'
import '@/assets/css/iconfont/iconfont.css'
import '@/assets/css/main.scss'
import 'simple-m-editor/dist/simple-m-editor.css'

// marked 设置
marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: code => {
    return hljs.highlightAuto(code).value
  },
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: true,
  headerIds: true,
  headerPrefix: 'vue-express',
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
})
Vue.prototype.Common = Common
Vue.prototype.Cookies = Cookies
Vue.prototype.marked = marked
Vue.component('Pagination', Pagination)
Vue.component('el-select', Select)
Vue.component('el-option', Option)
Vue.use(iView)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
