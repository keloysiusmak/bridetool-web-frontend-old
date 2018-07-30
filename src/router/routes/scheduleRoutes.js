//Layout
import AppLayout from '@/components/layout/app-layout'

//Components
import MainSchedule from '@/components/main/schedules/Schedule';
import MainScheduleModify from '@/components/main/schedules/ScheduleModify';
import MainActivityModify from '@/components/main/activities/ActivityModify';
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
        path: 'create',
        components: {
          main: MainScheduleModify,
          nav: NavDefault,
          sidebar: SidebarDefault
        },
        props: {
          main: (route) => ({
            modifyType: 'create'
          })
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
          main: MainScheduleModify,
          nav: NavDefault,
          sidebar: SidebarDefault
        },
        props: {
          main: (route) => ({
            scheduleId: route.params.scheduleId,
            modifyType: 'edit'
          })
        }
      },
      {
        path: ':scheduleId/newactivity',
        components: {
          main: MainActivityModify,
          nav: NavDefault,
          sidebar: SidebarDefault
        },
        props: {
          main: (route) => ({
            scheduleId: route.params.scheduleId,
            modifyType: 'create'
          })
        }
      }
    ]
  }
]
