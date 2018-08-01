//Layouts
import LayoutLeftSidebar from '@/components/layout/LeftSidebar';

//Components
import MainActivity from '@/components/panel/activities/Activity';
import MainActivityModify from '@/components/panel/activities/ActivityModify';

import NavbarDefault from '@/components/navbar/Default';

import SidebarDefault from '@/components/sidebar/Default';

export default [
  {
    path: '/activities/:activityId',
    meta: {
      requiresAuth: true
    },
    component: LayoutLeftSidebar,
    children: [
      {
        path: '',
        name: 'getActivity',
        components: {
          panel: MainActivity,
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
    path: '/activities/:activityId/edit',
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
            activityId: route.params.activityId,
            modifyType: 'edit'
          })
        }
      }
    ]
  }
]
