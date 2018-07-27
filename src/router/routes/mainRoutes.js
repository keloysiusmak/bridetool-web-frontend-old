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
    children: [
      {
        path: '/',
        meta: {
          requiresAuth: true
        },
        components: {
          main: MainDashboard,
          nav: NavDashboard,
          sidebar: SidebarDashboard
        },
        props: {
          main: true,
          nav: true,
          sidebar: true
        }
      }, {
        path: '/security',
        meta: {
          requiresAuth: true
        },
        components: {
          main: MainTest,
          nav: NavDashboard,
          sidebar: SidebarDashboard
        },
        props: {
          main: true
        }
      }
    ]
  }
]
