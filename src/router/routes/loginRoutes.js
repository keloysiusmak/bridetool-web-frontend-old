//Layout
import Layout from '@/components/layout/layout'

//Components
import MainLogin from '@/components/main/Login';

import NavLogin from '@/components/nav/Login';

export default [
  {
    path: '/login',
    meta: {
      requiresAuth: false
    },
    component: Layout,
    children: [
      {
        path: '/',
        components: {
          main: MainLogin,
          nav: NavLogin
        }
      }
    ]
  }
]
