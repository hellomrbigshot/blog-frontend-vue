import App from './App'
import store from './vuex'
import { router } from './router'
import { Common } from '@/assets/js/common.js'

import Pagination from './views/normal/components/Pagination'
import '@/assets/css/iconfont/iconfont.css'
import '@/assets/css/main.scss'
import 'simple-m-editor/dist/simple-m-editor.css'

// marked 设置
marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function (code) {
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
// Vue.prototype.hljs = hljs
Vue.component('Pagination', Pagination)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
