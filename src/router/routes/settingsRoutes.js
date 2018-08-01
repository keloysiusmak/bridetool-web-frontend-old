//Layouts
import LayoutLeftSidebar from '@/components/layout/LeftSidebar';

//Components
import MainEmail from '@/components/panel/settings/Email';
import MainPassword from '@/components/panel/settings/Password';

import NavbarDefault from '@/components/navbar/Default';

import SidebarSettings from '@/components/sidebar/Settings';

export default [
  {
    path: '/settings',
    meta: {
      requiresAuth: true
    },
    component: LayoutLeftSidebar,
    children: [
      {
        path: '/',
        redirect: '/settings/email'
      },
      {
        path: 'email',
        components: {
          panel: MainEmail,
          navbar: NavbarDefault,
          sidebar: SidebarSettings
        }
      },
      {
        path: 'password',
        components: {
          panel: MainPassword,
          navbar: NavbarDefault,
          sidebar: SidebarSettings
        }
      }
    ]
  }
];
