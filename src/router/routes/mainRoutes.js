//Layouts
import LayoutAppSplash from '@/components/layout/AppSplash';

//Sidebar
import NavbarDefault from '@/components/navbar/Default';

export default [
  {
    path: '/',
    component: LayoutAppSplash,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '/',
        redirect: 'schedule'
      }
    ]
  }
]
