const isChineseNewYear = new Date('2019-02-20') - new Date() > 0
// console.log(isChineseNewYear)
export const longinRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: '登录',
    login: false
  },
  component: () => import('@/views/Oauth/Login')
}
export const page404 = {
  path: '*',
  name: 'error-404',
  meta: {
    title: '404-页面不存在',
    login: false
  },
  component: () => import('@/views/ErrorPage/404')
}
export const registerRouter = {
  path: '/register',
  name: 'register',
  meta: {
    title: '注册',
    login: false
  },
  component: () => import('@/views/Oauth/Register')
}
export const oauthRegisterRouter = {
  path: '/oauthregister',
  name: 'oauthregister',
  meta: {
    title: '注册',
    login: false
  },
  component: () => import('@/views/Oauth/OauthRegister')
}
export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('admin/views/home'),
    redirect: '/dashboard',
    meta: {
      sidebar: false
    },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('admin/views/dashboard'),
        meta: {
          login: true,
          title: '数据统计',
          sidebar: false
        }
      }
    ]
  },
  {
    path: 'page',
    name: 'page',
    redirect: 'page/list',
    component: () => import('admin/views/home'),
    meta: {
      icon: 'ios-paper',
      title: '文章管理',
      sidebar: true
    },
    children: [
      {
        path: 'list',
        component: () => import('admin/views/pagelist'),
        name: 'pageList',
        meta: {
          title: '文章列表',
          login: true,
          sidebar: true
        }
      }
    ]
  },
  {
    path: 'user',
    name: 'user',
    redirect: 'user/list',
    component: () => import('admin/views/home'),
    meta: {
      icon: 'ios-people',
      title: '用户管理',
      sidebar: true
    },
    children: [
      {
        path: 'list',
        component: () => import('admin/views/userlist'),
        name: 'userList',
        meta: {
          title: '用户列表',
          login: true,
          sidebar: true
        }
      }
    ]
  },
  {
    path: 'tag',
    name: 'tag',
    redirect: 'tag/list',
    component: () => import('admin/views/home'),
    meta: {
      icon: 'ios-pricetags',
      sidebar: true,
      title: '标签管理'
    },
    children: [
      {
        path: 'list',
        component: () => import('admin/views/taglist'),
        name: 'tagList',
        meta: {
          login: true,
          title: '标签列表',
          sidebar: true
        }
      }
    ]
  }
]
export const routers = [
  longinRouter,
  page404,
  registerRouter,
  oauthRegisterRouter,
  ...routes
]
