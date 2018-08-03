//Layouts
import LayoutSinglePanel from '@/components/layout/SinglePanel';

//Components
import MainLogin from '@/components/panel/login/Login';
import NavbarLogin from '@/components/navbar/Login';

export default [
  {
    path: '/login',
    meta: {
      requiresAuth: false
    },
    component: LayoutSinglePanel,
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
