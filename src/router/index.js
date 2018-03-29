import Vue from 'vue'
import VueRouter from 'vue-router'
import {routers} from './router'

Vue.use(VueRouter)

const RouterConfig = {
  mode: 'history',
  routes: routers
}

export const router = new VueRouter(RouterConfig)