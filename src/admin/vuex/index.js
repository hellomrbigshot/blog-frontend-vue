import Vue from 'vue'
import Vuex from 'vuex'
import { routes } from '../router/router'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    routers: routes
  }
})

export default store
