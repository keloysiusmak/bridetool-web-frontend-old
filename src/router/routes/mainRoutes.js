//layout
import Layout from '@/components/layout/Layout'

//Components
import MainDashboard from '@/components/main/Dashboard';
import MainTest from '@/components/main/Test';

import NavDashboard from '@/components/nav/Dashboard';

import SidebarDashboard from '@/components/sidebar/Dashboard';

export default [
  {
    path: '/',
    component: Layout,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '/',
        components: {
          main: MainDashboard,
          nav: NavDashboard,
          sidebar: SidebarDashboard
        }
      }
    ]
  }
]
