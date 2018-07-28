//layout
import AppLayout from '@/components/layout/app-layout'

//Components
import MainProfile from '@/components/main/settings/Profile';
import MainPassword from '@/components/main/settings/Password';

import NavDefault from '@/components/nav/Default';

import SidebarSettings from '@/components/sidebar/Settings';

export default [
  {
    path: '/settings',
    meta: {
      requiresAuth: true
    },
    component: AppLayout,
    children: [
      {
        path: '/',
        redirect: 'profile'
      },
      {
        path: 'profile',
        components: {
          main: MainProfile,
          nav: NavDefault,
          sidebar: SidebarSettings
        }
      },
      {
        path: 'password',
        components: {
          main: MainPassword,
          nav: NavDefault,
          sidebar: SidebarSettings
        }
      }
    ]
  }
];
