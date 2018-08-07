//Layouts
import LayoutAppClean from '@/components/layout/AppClean';

//Components
import MainLogin from '@/components/panel/login/Login';

export default [
  {
    path: '/login',
    meta: {
      requiresAuth: false
    },
    component: LayoutAppClean,
    children: [
      {
        path: '/',
        components: {
          panel: MainLogin
        }
      }
    ]
  }
]
