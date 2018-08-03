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
          panel: true,
          sidebar: true
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
          panel: (route) => ({
            activityId: route.params.activityId,
            modifyType: 'edit'
          }),
          sidebar: true
        }
      }
    ]
  }
]
