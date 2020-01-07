import Vue from 'vue'
import iView from 'iview'
import Cookies from 'js-cookie'
import VueRouter from 'vue-router'
import { routers } from './router'

Vue.use(VueRouter)

const RouterConfig = {
  mode: 'history',
  routes: routers,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
}

export const router = new VueRouter(RouterConfig)

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  if (to.name === 'CommentList') {
    iView.Notice.destroy()
  }
  if (!Cookies.get('user') && to.name !== 'Login' && to.meta.login) {
    next({
      name: 'Login',
      query: { redirect: router.currentRoute.fullPath }
    })
  } else if (Cookies.get('user') && ['Login', 'Register'].includes(to.name)) {
    iView.LoadingBar.finish()
    next(false)
  } else {
    next()
  }
})

router.afterEach((to, from, next) => {
  iView.LoadingBar.finish()
})
