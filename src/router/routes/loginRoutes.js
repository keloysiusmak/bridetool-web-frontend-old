//Layouts
import LayoutLeftSidebar from '@/components/layout/LeftSidebar';

//Components
import MainLogin from '@/components/panel/login/Login';

import NavbarLogin from '@/components/navbar/Login';

export default [
  {
    path: '/login',
    meta: {
      requiresAuth: false
    },
    component: LayoutLeftSidebar,
    children: [
      {
        path: '/',
        components: {
          panel: MainLogin,
          navbar: NavbarLogin
        }
      }
    ]
  }
]
