//Layout
import Layout from '@/components/layout/layout'

//Components
import MainSchedule from '@/components/main/Schedule';

import NavDashboard from '@/components/nav/Dashboard';

import SidebarDashboard from '@/components/sidebar/Dashboard';

export default [
  {
    path: '/schedule',
    meta: {
      requiresAuth: true
    },
    component: Layout,
    children: [
      {
        path: ':scheduleId',
        name: 'getSchedule',
        components: {
          main: MainSchedule,
          nav: NavDashboard,
          sidebar: SidebarDashboard
        },
        props:{
          main: true
        }
      }
    ]
  }
]
