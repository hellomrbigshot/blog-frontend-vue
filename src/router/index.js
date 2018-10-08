// import Vue from 'vue'
import iView from 'iview'
// import VueRouter from 'vue-router'
import Cookies from 'js-cookie'
import { routers } from './router'

// Vue.use(VueRouter)

const RouterConfig = {
  mode: 'history',
  routes: routers
}

export const router = new VueRouter(RouterConfig)

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  if (!Cookies.get('user') && to.name !== 'login' && to.meta.login) {
    next({
      name: 'login',
      query: { redirect: router.currentRoute.fullPath }
    })
  } else if (Cookies.get('user') && to.name === 'login') {
    if (Cookies.get('user') === 'admin') {
      next({
        name: 'admin'
      })
    } else {
      next({
        name: 'normal'
      })
    }
  } else {
    next()
  }
  
})

router.afterEach((to, from, next) => {
  iView.LoadingBar.finish()
})