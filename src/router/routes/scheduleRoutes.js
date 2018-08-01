//Layouts
import LayoutLeftSidebar from '@/components/layout/LeftSidebar';

//Components
import MainSchedule from '@/components/panel/schedules/Schedule';
import MainScheduleModify from '@/components/panel/schedules/ScheduleModify';
import MainActivityModify from '@/components/panel/activities/ActivityModify';
import MainSchedules from '@/components/panel/schedules/Schedules';

import NavbarDefault from '@/components/navbar/Default';

import SidebarDefault from '@/components/sidebar/Default';

export default [
  {
    path: '/schedules',
    meta: {
      requiresAuth: true
    },
    component: LayoutLeftSidebar,
    children: [
      {
        path: '',
        components: {
          panel: MainSchedules,
          navbar: NavbarDefault,
          sidebar: SidebarDefault
        }
      }
    ]
  },
  {
    path: '/schedules/create',
    meta: {
      requiresAuth: true
    },
    component: LayoutLeftSidebar,
    children: [
      {
        path: '',
        components: {
          panel: MainScheduleModify,
          navbar: NavbarDefault,
          sidebar: SidebarDefault
        },
        props: {
          panel: (route) => ({
            modifyType: 'create'
          })
        }
      }
    ]
  },
  {
    path: '/schedules/:scheduleId',
    meta: {
      requiresAuth: true
    },
    component: LayoutLeftSidebar,
    children: [
      {
        path: '',
        name: 'getSchedule',
        components: {
          panel: MainSchedule,
          navbar: NavbarDefault,
          sidebar: SidebarDefault
        },
        props:{
          panel: true
        }
      }
    ]
  },
  {
    path: '/schedules/:scheduleId/edit',
    meta: {
      requiresAuth: true
    },
    component: LayoutLeftSidebar,
    children: [
      {
        path: '',
        components: {
          panel: MainScheduleModify,
          navbar: NavbarDefault,
          sidebar: SidebarDefault
        },
        props: {
          panel: (route) => ({
            scheduleId: route.params.scheduleId,
            modifyType: 'edit'
          })
        }
      }
    ]
  },
  {
    path: '/schedules/:scheduleId/activity',
    meta: {
      requiresAuth: true
    },
    component: LayoutLeftSidebar,
    children: [
      {
        path: '',
        components: {
          panel: MainActivityModify,
          navbar: NavbarDefault,
          sidebar: SidebarDefault
        },
        props: {
          panel: (route) => ({
            scheduleId: route.params.scheduleId,
            modifyType: 'create'
          })
        }
      }
    ]
  }
]
