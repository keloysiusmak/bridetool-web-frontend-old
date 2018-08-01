//Layouts
import LayoutLeftSidebar from '@/components/layout/LeftSidebar';

//Components
import MainWelcomeCustomer from '@/components/panel/default/WelcomeCustomer';

import NavbarDefault from '@/components/navbar/Default';

import SidebarDefault from '@/components/sidebar/Default';

export default [
  {
    path: '/',
    component: LayoutLeftSidebar,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '/',
        redirect: 'schedules'
      },
      {
        path: 'welcome',
        components: {
          panel: MainWelcomeCustomer,
          navbar: NavbarDefault,
          sidebar: SidebarDefault
        }
      }
    ]
  }
]
