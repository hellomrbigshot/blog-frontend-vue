import Vue from 'vue'
import iView from 'iview'
import VueRouter from 'vue-router'
import {routers} from './router'

Vue.use(VueRouter)

const RouterConfig = {
  mode: 'history',
  routes: routers
}

export const router = new VueRouter(RouterConfig)

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  next();
})

router.afterEach((to, from, next) => {
  iView.LoadingBar.finish()
})