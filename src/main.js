import Vue from 'vue'
import App from './App'
import store from './vuex'
import { router } from './router'
import { Common } from '@/assets/js/common'

import marked from 'marked'
import hljs from '@/assets/js/highlight'
import Cookies from 'js-cookie'
import {
  Select as ElSelect,
  Option as ElOption,
  Form as ElForm,
  FormItem as ElFormItem,
  Input as ElInput,
  Switch as ElSwitch,
  Button as ElButton
} from 'element-ui'
import {
  Button,
  Table,
  Icon,
  Layout,
  Sider,
  Menu,
  MenuItem,
  Breadcrumb,
  Header,
  Content,
  Form as IForm,
  FormItem as IFormItem,
  Input,
  Switch,
  Row,
  Col,
  Modal,
  Tag,
  Timeline,
  TimelineItem,
  Page,
  Tabs,
  TabPane,
  Message,
  Footer
} from 'iview'

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
Vue.component('el-select', ElSelect)
Vue.component('el-option', ElOption)
Vue.component('el-form', ElForm)
Vue.component('el-form-item', ElFormItem)
Vue.component('el-input', ElInput)
Vue.component('el-switch', ElSwitch)
Vue.component('el-button', ElButton)
Vue.component('Button', Button)
Vue.component('Table', Table)
Vue.component('Icon', Icon)
Vue.component('Layout', Layout)
Vue.component('Footer', Footer)
Vue.component('Menu', Menu)
Vue.component('MenuItem', MenuItem)
Vue.component('Content', Content)
Vue.component('Header', Header)
Vue.component('Form', IForm)
Vue.component('FormItem', IFormItem)
Vue.component('Sider', Sider)
Vue.component('Breadcrumb', Breadcrumb)
Vue.component('Input', Input)
Vue.component('Switch', Switch)
Vue.component('Row', Row)
Vue.component('Col', Col)
Vue.component('Modal', Modal)
Vue.component('Tag', Tag)
Vue.component('Timeline', Timeline)
Vue.component('TimelineItem', TimelineItem)
Vue.component('Page', Page)
Vue.component('Pagination', Pagination)
Vue.component('Tabs', Tabs)
Vue.component('TabPane', TabPane)
Vue.prototype.$Message = Message
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
