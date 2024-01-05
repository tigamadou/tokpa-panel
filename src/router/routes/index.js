import { lazy } from 'react'

// ** Document title
const TemplateTitle = '%s - Tokpa BJ Admin '

// ** Default Route
const DefaultRoute = '/home'

const Routes = [
  {
    path: '/home',
    component: lazy(() => import('../../views/Home'))
  },
  {
    path: '/login',
    component: lazy(() => import('../../views/login/Login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/register',
    component: lazy(() => import('../../views/Register')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/email-verification',
    component: lazy(() => import('../../views/VerifyEmailBasic')),
    layout: 'BlankLayout'
  },
  {
    path: '/post/list',
    component: lazy(() => import('../../views/post/list'))
  },
  {
    path: '/password-reset/:email',
    component: lazy(() => import('../../views/ResetPasswordBasic'))
  },
  {
    path: '/post/edit/:id',
    component: lazy(() => import('../../views/post/edit')),
    meta: {
      navLink: '/post/edit'
    }
  },
  {
    path: '/post/preview/:id',
    component: lazy(() => import('../../views/post/preview'))
  },
  {
    path: '/post/add',
    component: lazy(() => import('../../views/post/add'))
  },
  {
    path: '/scrapper/list',
    component: lazy(() => import('../../views/scrapper/list'))
  },
  {
    path: '/scrapper/preview/:id',
    component: lazy(() => import('../../views/scrapper/preview'))
  },
  {
    path: '/page/list',
    component: lazy(() => import('../../views/page/list')),
    meta: {
      allowedRoles: ['Administrator']
    }
  },
  {
    path: '/password-reset/:email',
    component: lazy(() => import('../../views/ResetPasswordBasic'))
  },
  {
    path: '/page/edit/:id',
    component: lazy(() => import('../../views/page/edit')),
    meta: {
      navLink: '/page/edit',
      allowedRoles: ['Administrator']
    }
  },
  {
    path: '/page/preview/:id',
    component: lazy(() => import('../../views/page/preview')),
    meta: {
      allowedRoles: ['Administrator']
    }
  },

  {
    path: '/page/add',
    component: lazy(() => import('../../views/page/add')),
    meta: {
      allowedRoles: ['Administrator']
    }
  },

  {
    path: '/user/list',
    component: lazy(() => import('../../views/user/list')),
    meta: {
      allowedRoles: ['Administrator']
    }
  },
  {
    path: '/user/view/:id',
    component: lazy(() => import('../../views/user/view')),
    meta: {
      allowedRoles: ['Administrator']
    }
  },
  {
    path: '/categories',
    component: lazy(() => import('../../views/categories/list')),
    meta: {
      allowedRoles: ['Administrator']
    }
  },
  {
    path: '/menus',
    component: lazy(() => import('../../views/menus/list')),
    meta: {
      allowedRoles: ['Administrator']
    }
  },
  {
    path: '/errors/list',
    component: lazy(() => import('../../views/errors/list')),
    meta: {
      allowedRoles: ['Administrator']
    }
  },
  {
    path: '/errors/preview/:id',
    component: lazy(() => import('../../views/errors/preview')),
    meta: {
      allowedRoles: ['Administrator']
    }
  },
  {
    path: '/error',
    component: lazy(() => import('../../views/Error')),
    layout: 'BlankLayout'
  },
  {
    path: '/reports/list',
    component: lazy(() => import('../../views/reports/list')),
    meta: {
      allowedRoles: ['Administrator']
    }
  },
  {
    path: '/reports/preview/:id',
    component: lazy(() => import('../../views/reports/preview')),
    meta: {
      allowedRoles: ['Administrator']
    }
  },
  {
    path: '/comments/list',
    component: lazy(() => import('../../views/comments/list')),
    meta: {
      allowedRoles: ['Administrator', 'Editor', 'Contributor']
    }
  },
  {
    path: '/comments/blocked/list',
    component: lazy(() => import('../../views/comments/blocked_list'))
  },
  {
    path: '/comments/preview/:id',
    component: lazy(() => import('../../views/comments/preview'))
  },
  {
    path: '/libraries',
    component: lazy(() => import('../../views/libraries/list'))
  }

]

export { DefaultRoute, TemplateTitle, Routes }
