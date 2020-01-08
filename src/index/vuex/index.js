import Vue from 'vue'
import Vuex from 'vuex'
import normal from './modules/normal'
import user from './modules/user'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    normal,
    user
  }
})

export default store
