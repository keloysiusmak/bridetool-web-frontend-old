//Layouts
import LayoutLeftSidebar from '@/components/layout/LeftSidebar';

//Panel
import MainActivity from '@/components/panel/activities/Activity';
import MainActivityModify from '@/components/panel/activities/ActivityModify';

//Navbar
import NavbarDefault from '@/components/navbar/Default';

//Sidebar
import SidebarActivity from '@/components/sidebar/activities/Activity';

export default [
  {
    path: '/activities/',
    meta: {
      requiresAuth: true
    },
    component: LayoutLeftSidebar,
    children: [
      {
        path: ':activityId',
        name: 'getActivity',
        components: {
          panel: MainActivity,
          navbar: NavbarDefault,
          sidebar: SidebarActivity
        },
        props:{
          navbar: (route) => ({
            navbarSelected: 'schedules'
          }),
          panel: true,
          sidebar: (route) => ({
            activityId: route.params.activityId,
            sidebarSelected: 'activityoverview'
          })
        }
      },
      {
        path: ':activityId/edit',
        components: {
          panel: MainActivityModify,
          navbar: NavbarDefault,
          sidebar: SidebarActivity
        },
        props: {
          navbar: (route) => ({
            navbarSelected: 'schedules'
          }),
          panel: (route) => ({
            activityId: route.params.activityId,
            modifyType: 'edit'
          }),
          sidebar: (route) => ({
            activityId: route.params.activityId,
            sidebarSelected: 'editactivity'
          })
        }
      }
    ]
  }
]
