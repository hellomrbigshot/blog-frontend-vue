import Vue from 'vue'
import Vuex from 'vuex'
import admin from './modules/admin'
import normal from './modules/normal'
Vue.use(Vuex)

const store = new Vuex.Store({
    store: {

    },
    mutations: {

    },
    actions: {

    },
    modules: {
        admin,
        normal
    }
})

export default store