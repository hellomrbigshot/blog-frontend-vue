const isChineseNewYear = new Date('2019-02-20') - new Date() > 0
console.log(isChineseNewYear)
export const longinRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: '登录',
    login: false,
  },
  component: () => import('@/views/login')
}
export const page404 = {
  path: '*',
  name: 'error-404',
  meta: {
    title: '404-页面不存在',
    login: false,
  },
  component: () => import('@/views/error-page/404')
}
export const registerRouter = {
  path: '/register',
  name: 'register',
  meta: {
    title: '注册',
    login: false,
  },
  component: () => import('@/views/register')
}
export const oauthRegisterRouter = {
  path: '/oauthregister',
  name: 'oauthregister',
  meta: {
    title: '注册',
    login: false
  },
  component: () => import('@/views/oauthRegister')
}
// export const redirect = { // 若是 admin 跳转到管理界面，其他用户跳转到文章列表页
//   path: '/',
//   redirect: Cookies.get('user') === 'admin' ? '/admin' : 'normal'
// }
export const adminRouter = {
  path: '/admin',
  name: 'admin',
  component: () => import('@/views/admin/home'),
  redirect: '/admin/statistics',
  children: [
    {
      path: 'statistics',
      name: 'statistics',
      title: '数据统计',
      component: () => import('@/views/admin/statistics'),
      meta: {
        login: true,
        sidebar: false
      }
    },
    {
      path: 'page',
      name: 'page',
      title: '文章管理',
      redirect: 'page/list',
      component: {template: '<router-view></router-view>'},
      meta: {
        icon: 'ios-paper',
        sidebar: true,
      },
      children: [
      {
          path: 'list',
          component: () => import('@/views/admin/pagelist'),
          name: 'adminPageList',
          title: '文章列表',
          meta: {
            login: true,
            sidebar: true
          }
      }
      ]
  },
  {
      path: 'user',
      name: 'user',
      title: '用户管理',
      redirect: 'user/list',
      component: {template: '<router-view></router-view>'},
      meta: {
        icon: 'ios-people',
        sidebar: true
      },
      children: [
      {
          path: 'list',
          component: () => import('@/views/admin/userlist'),
          name: 'adminUserList',
          title: '用户列表',
          meta: {
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
      title: '标签管理',
      component: {template: '<router-view></router-view>'},
      meta: {
        icon: 'ios-pricetags',
        sidebar: true
      },        
      children: [
      {
          path: 'list',
          component: () => import('@/views/admin/taglist'),
          name: 'adminTagList',
          title: '标签列表',
          meta: {
            login: true,
            sidebar: true
          }
      }
      ]
  }
  ]
}
export const normalRouter = {
  path: '/',
  redirect: isChineseNewYear ? '/welcome' : '/pages',
  name: 'normal',
  meta: {
    login: false
  },
  component: () => import('@/views/normal/home'),
  children: [
    {
      path: '/pages',
      name: 'normalPage',
      redirect: '/pages/list',
      component: { template: '<router-view></router-view>' },
      meta: {
        login: false,
        title: '首页',
        inHeaderList: true
      },
      children: [
        {
          name: 'normalPageList',
          path: 'list',
          component: () => import('@/views/normal/pageList'),
          meta: {
            login: false,
            title: '文章列表'
          },
        },
        {
          name: 'pageDetail',
          component: () => import('@/views/normal/pageDetail'),
          path: 'detail/:id/:hash',
          meta: {
            login: false,
            title: '文章详情',
            inHeaderList: false
          }
        },
        {
          name: 'normalMyDraftList',
          component: () => import('@/views/normal/myDraftList'),
          path: 'draft',
          meta: {
            login: true,
            title: '草稿',
            inHeaderList: false
          }
        },
        {
          name: 'normalMyPageList',
          component: () => import('@/views/normal/myPageList'),
          path: 'mylist',
          meta: {
            login: true,
            title: '归档',
            inHeaderList: true
          }
        },
      ]
    },
    {
      path: '/tags',
      name: 'normalTag',
      redirect: '/tags/list',
      component: { template: '<router-view></router-view>' },
      meta: {
        login: false,
        title: '标签',
        inHeaderList: true
      },
      children: [
        {
          path: 'list',
          name: 'normalTagList',
          component: () => import('@/views/normal/tagList'),
          meta: {
            login: false,
            title: '标签',
            inHeaderList: true
          }
        },
        {
          path: 'detail/:name',
          name: 'normalTagDetail',
          component: () => import('@/views/normal/tagDetail'),
          meta: {
            login: false,
            title: '标签详情',
            inHeaderList: false
          }
        },
      ]
    },
    {
      name: 'normalGuestBook',
      component: () => import('@/views/normal/guestBook'),
      path: 'comments',
      meta: {
        login: true,
        title: '留言',
        inHeaderList: true
      },
    },
    {
      name: 'normalNew',
      component: () => import('@/views/normal/newPage'),
      path: 'new',
      meta: {
        login: true,
        title: '写文章',
        inHeaderList: true
      }
    },
    
    {
      name: 'editPage',
      component: () => import('@/views/normal/newPage'),
      path: 'edit/:id',
      meta: {
        login: true,
        title: '编辑',
        inHeaderList: false
      }
    },
    {
      name: 'userDetail',
      component: () => import('@/views/normal/userInfo/userDetail'),
      path: 'user/:username',
      meta: {
        login: false,
        title: '用户详情',
        inHeaderList: false
      }
    },
    {
      path: '/welcome',
      name: 'welcomePage',
      redirect: '/welcome/chineseNewYear',
      component: { template: '<router-view></router-view>' },
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
          name: 'chineseNewYear',
          path: 'chineseNewYear',
          component: () => import('@/views/welcome/chineseNewYear'),
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
  ]
}
export const routers = [ // 上面定义的路由均写在 routers 
  longinRouter,
  page404,
  registerRouter,
  oauthRegisterRouter,
  // redirect,
  normalRouter,
  adminRouter
]
  