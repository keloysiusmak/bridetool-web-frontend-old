//Layout
import LoginLayout from '@/components/layout/login-layout'

//Components
import MainLogin from '@/components/main/login/Login';

import NavLogin from '@/components/nav/Login';

export default [
  {
    path: '/login',
    meta: {
      requiresAuth: false
    },
    component: LoginLayout,
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
