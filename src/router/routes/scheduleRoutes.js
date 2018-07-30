//Layout
import AppLayout from '@/components/layout/app-layout'

//Components
import MainSchedule from '@/components/main/schedules/Schedule';
import MainScheduleEdit from '@/components/main/schedules/ScheduleEdit';
import MainDeletedSchedules from '@/components/main/schedules/DeletedSchedules';
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
        path: 'deleted',
        components: {
          main: MainDeletedSchedules,
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
      },
      {
        path: ':scheduleId/edit',
        components: {
          main: MainScheduleEdit,
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
