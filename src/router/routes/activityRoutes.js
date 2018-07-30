//Layout
import AppLayout from '@/components/layout/app-layout'

//Components
import MainActivity from '@/components/main/activities/Activity';
import MainActivityModify from '@/components/main/activities/ActivityModify';

import NavDefault from '@/components/nav/Default';

import SidebarDefault from '@/components/sidebar/Default';

export default [
  {
    path: '/activities',
    meta: {
      requiresAuth: true
    },
    component: AppLayout,
    children: [
      {
        path: ':activityId',
        name: 'getActivity',
        components: {
          main: MainActivity,
          nav: NavDefault,
          sidebar: SidebarDefault
        },
        props:{
          main: true
        }
      }, {
        path: ':activityId/edit',
        components: {
          main: MainActivityModify,
          nav: NavDefault,
          sidebar: SidebarDefault
        },
        props: {
          main: (route) => ({
            activityId: route.params.activityId,
            modifyType: 'edit'
          })
        }
      }
    ]
  }
]
