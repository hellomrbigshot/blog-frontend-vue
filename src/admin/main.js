import Vue from 'vue'
import App from './App'
import store from './vuex'
import { router } from './router'
import { Common } from '@/assets/js/common'

import marked from 'marked'
import hljs from '@/assets/js/highlight'
import Cookies from 'js-cookie'
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
  Row,
  Col,
  Modal,
  Tag,
  Page,
  Message,
  Footer,
  BreadcrumbItem,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Card,
  Submenu
} from 'iview'

import 'iview/dist/styles/iview.css'
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
  headerPrefix: 'admin',
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
})
Vue.prototype.Common = Common
Vue.prototype.Cookies = Cookies
Vue.prototype.marked = marked
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
Vue.component('Input', Input)
// Vue.component('Switch', Switch)
Vue.component('Row', Row)
Vue.component('Col', Col)
Vue.component('Modal', Modal)
Vue.component('Tag', Tag)
Vue.component('Page', Page)
Vue.component('Breadcrumb', Breadcrumb)
Vue.component('DropdownMenu', DropdownMenu)
Vue.component('BreadcrumbItem', BreadcrumbItem)
Vue.component('Dropdown', Dropdown)
Vue.component('DropdownItem', DropdownItem)
Vue.component('Card', Card)
Vue.component('Submenu', Submenu)
Vue.prototype.$Message = Message
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
