const isChineseNewYear = new Date('2019-02-20') - new Date() > 0
export const longinRouter = {
  path: '/login',
  name: 'Login',
  meta: {
    title: '登录',
    login: false
  },
  component: () => import('@/views/Oauth/Login')
}
export const registerRouter = {
  path: '/register',
  name: 'Register',
  meta: {
    title: '注册',
    login: false
  },
  component: () => import('@/views/Oauth/Register')
}
export const oauthRegisterRouter = {
  path: '/oauthregister',
  name: 'OauthRegister',
  meta: {
    title: '注册',
    login: false
  },
  component: () => import('@/views/Oauth/OauthRegister')
}
export const welcomeRouter = {
  path: '/welcome',
  name: 'WelcomePage',
  redirect: '/Welcome/ChineseNewYear',
  component: { template: '<router-view/>' },
  meta: {
    login: false,
    title: '欢迎页',
    inHeaderList: false,
    hideHeader: true,
    hideSider: true,
    hideFooter: true
  },
  children: [
    {
      name: 'ChineseNewYear',
      path: 'chinesenewyear',
      component: () => import('@/views/Welcome/ChineseNewYear'),
      meta: {
        login: false,
        title: '春节',
        inHeaderList: false,
        hideHeader: true,
        hideSider: true,
        hideFooter: true
      }
    }
  ]
}
export const routes = {
  path: '/',
  name: 'Home',
  redirect: isChineseNewYear ? '/welcome' : '/page/list',
  component: () => import('index/views/Home'),
  meta: {
    login: false,
    inHeaderList: false
  },
  children: [
    {
      name: 'PageList',
      path: 'page/list',
      component: () => import('index/views/Page/PageList'),
      meta: {
        login: false,
        title: '文章列表',
        inHeaderList: false
      }
    },
    {
      name: 'PageDetail',
      path: 'detail/:id/:hash?',
      component: () => import('index/views/Page/PageDetail'),
      meta: {
        login: false,
        title: '文章详情',
        inHeaderList: false
      }
    },
    {
      name: 'PageListForDraft',
      path: 'page/list/draft',
      component: () => import('index/views/Page/PageListForDraft'),
      meta: {
        login: true,
        title: '草稿',
        inHeaderList: false
      }
    },
    {
      name: 'TagList',
      path: '/tag/list',
      component: () => import('index/views/Tag/TagList'),
      meta: {
        login: false,
        title: '标签',
        inHeaderList: true
      }
    },
    {
      name: 'PageListForUser',
      path: 'page/list/user',
      component: () => import('index/views/Page/PageListForUser'),
      meta: {
        login: true,
        title: '归档',
        inHeaderList: true
      }
    },
    {
      name: 'TagDetail',
      path: 'tag/detail/:name',
      component: () => import('index/views/Tag/TagDetail'),
      meta: {
        login: false,
        title: '标签详情',
        inHeaderList: false
      }
    },
    {
      name: 'CommentList',
      path: 'comment/list',
      component: () => import('index/views/CommentList'),
      meta: {
        login: true,
        title: '留言',
        inHeaderList: true
      }
    },
    {
      name: 'PageNew',
      component: () => import('index/views/Page/PageNew'),
      path: '/new',
      meta: {
        login: true,
        title: '写文章',
        inHeaderList: false
      }
    },
    {
      name: 'PageEdit',
      component: () => import('index/views/Page/PageNew'),
      path: 'edit/:id',
      meta: {
        login: true,
        title: '编辑',
        inHeaderList: false
      }
    },
    {
      name: 'UserDetail',
      component: () => import('index/views/UserDetail'),
      path: 'user/:username',
      meta: {
        login: false,
        title: '用户详情',
        inHeaderList: false
      }
    }
  ]
}
export const page404 = {
  path: '*',
  name: 'Error404',
  meta: {
    title: '404-页面不存在',
    login: false
  },
  component: () => import('@/views/ErrorPage/404')
}
export const routers = [
  // 上面定义的路由均写在 routers
  longinRouter,
  // page404,
  registerRouter,
  oauthRegisterRouter,
  // redirect,
  routes,
  welcomeRouter
]
