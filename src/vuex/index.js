// import Vue from 'vue'
import Vuex from 'vuex'
import admin from './modules/admin'
import normal from './modules/normal'
import user from './modules/user'
// Vue.use(Vuex)

const store = new Vuex.Store({
    store: {

    },
    mutations: {

    },
    actions: {

    },
    modules: {
        admin,
        normal,
        user
    }
})

export default store