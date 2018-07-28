//Layout
import AppLayout from '@/components/layout/app-layout'

//Components
import MainSchedule from '@/components/main/schedules/Schedule';
import MainSchedules from '@/components/main/schedules/Schedules';

import NavDefault from '@/components/nav/Default';

import SidebarDefault from '@/components/sidebar/Default';

export default [
  {
    path: '/schedules',
    meta: {
      requiresAuth: true
    },
    component: AppLayout,
    children: [
      {
        path: '',
        components: {
          main: MainSchedules,
          nav: NavDefault,
          sidebar: SidebarDefault
        }
      },
      {
        path: ':scheduleId',
        name: 'getSchedule',
        components: {
          main: MainSchedule,
          nav: NavDefault,
          sidebar: SidebarDefault
        },
        props:{
          main: true
        }
      }
    ]
  }
]