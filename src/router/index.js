import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/views/login'
import register from '@/views/register'
import main from '@/views/main'
import page404 from '@/views/404'
import admin from '@/views/admin/index'
import pageList from '@/views/admin/pagelist'
import userList from '@/views/admin/userlist'
import tagList from '@/views/admin/taglist'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      name: '404',
      components: page404
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: login
    },
    {
      path: '/register',
      name: 'Register',
      component: register
    },
    {
      path: '/main',
      name: 'Main',
      component: main
    },
    {
      path: '/admin',
      name: 'Admin',
      component: admin,
      children: [
        {
          path: 'page',
          name: '文章管理',
          redirect: 'page/list',
          children: [
            {
              path: 'list',
              component: pageList
              name: '文章列表'
            }
          ]
        },
        {
          path: 'user',
          name: '用户管理',
          redirect: 'user/list',
          children: [
            {
              path: 'list',
              component: userList,
              name: '用户列表'
            }
          ]
        },
        {
          path: 'tag',
          name: '标签管理',
          redirect: 'tag/list',
          children: [
            {
              path: 'list',
              component: tagList,
              name: '标签列表'
            }
          ]
        }
      ]
    }
  ]
})
