//layout
import Layout from '@/components/layout/Layout'

//Components
import MainDashboard from '@/components/main/Dashboard';
import MainTest from '@/components/main/Test';

import NavDashboard from '@/components/nav/Dashboard';

import SidebarSettings from '@/components/sidebar/Settings';

export default [
  {
    path: '/settings',
    meta: {
      requiresAuth: true
    },
    component: Layout,
    children: [
      {
        path: '/',
        components: {
          main: MainTest,
          nav: NavDashboard,
          sidebar: SidebarSettings
        }
      }
    ]
  }
];
