//Layouts
import LayoutLeftSidebar from '@/components/layout/LeftSidebar';

//Panel
import MainSchedule from '@/components/panel/schedules/Schedule';
import MainScheduleActivities from '@/components/panel/schedules/ScheduleActivities';
import MainScheduleModify from '@/components/panel/schedules/ScheduleModify';
import MainActivityModify from '@/components/panel/activities/ActivityModify';
import MainSchedules from '@/components/panel/schedules/Schedules';

//Navbar
import NavbarDefault from '@/components/navbar/Default';

//Sidebar
import SidebarSchedules from '@/components/sidebar/schedules/Schedules';
import SidebarSchedule from '@/components/sidebar/schedules/Schedule';

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
          sidebar: SidebarSchedules
        },
        props: {
          navbar: (route) => ({
            navbarSelected: 'schedules'
          }),
          sidebar: (route) => ({
            scheduleId: route.params.scheduleId,
            sidebarSelected: 'schedulesoverview'
          })
        }
      },
      {
        path: 'create',
        components: {
          panel: MainScheduleModify,
          navbar: NavbarDefault,
          sidebar: SidebarSchedules
        },
        props: {
          panel: (route) => ({
            modifyType: 'create'
          }),
          navbar: (route) => ({
            navbarSelected: 'schedules'
          }),
          sidebar: (route) => ({
            sidebarSelected: 'createschedule'
          })
        }
      },
      {
        path: ':scheduleId',
        name: 'getSchedule',
        components: {
          panel: MainSchedule,
          navbar: NavbarDefault,
          sidebar: SidebarSchedule
        },
        props:{
          panel: true,
          navbar: (route) => ({
            navbarSelected: 'schedules'
          }),
          sidebar: (route) => ({
            scheduleId: route.params.scheduleId,
            sidebarSelected: 'scheduleoverview'
          })
        }
      },
      {
        path: ':scheduleId/activities',
        components: {
          panel: MainScheduleActivities,
          navbar: NavbarDefault,
          sidebar: SidebarSchedule
        },
        props:{
          panel: true,
          navbar: (route) => ({
            navbarSelected: 'schedules'
          }),
          sidebar: (route) => ({
            scheduleId: route.params.scheduleId,
            sidebarSelected: 'activities'
          })
        }
      },
      {
        path: ':scheduleId/edit',
        components: {
          panel: MainScheduleModify,
          navbar: NavbarDefault,
          sidebar: SidebarSchedule
        },
        props: {
          panel: (route) => ({
            scheduleId: route.params.scheduleId,
            modifyType: 'edit'
          }),
          navbar: (route) => ({
            navbarSelected: 'schedules'
          }),
          sidebar: (route) => ({
            scheduleId: route.params.scheduleId,
            sidebarSelected: 'editschedule'
          })
        }
      },
      {
        path: ':scheduleId/activity',
        components: {
          panel: MainActivityModify,
          navbar: NavbarDefault,
          sidebar: SidebarSchedule
        },
        props: {
          panel: (route) => ({
            scheduleId: route.params.scheduleId,
            modifyType: 'create'
          }),
          navbar: (route) => ({
            navbarSelected: 'schedules'
          }),
          sidebar: (route) => ({
            scheduleId: route.params.scheduleId,
            sidebarSelected: 'createactivity'
          })
        }
      }
    ]
  }
]
