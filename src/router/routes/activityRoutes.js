//Layouts
import LayoutAppPanel from '@/components/layout/AppPanel';

//Panel
import PanelActivitiesModify from '@/components/panel/activity/Modify';

//Subbar
import SubbarPlanner from '@/components/subbar/Planner';

//Sidebar
import SidebarDefault from '@/components/sidebar/Default';

//Footer
import FooterDefault from '@/components/footer/Default';

export default [
  {
    path: '/activities/',
    meta: {
      requiresAuth: true
    },
    component: LayoutAppPanel,
    children: [
      {
        path: ':activityId/edit',
        name: 'ActivityEdit',
        components: {
          panel: PanelActivitiesModify,
          sidebar: SidebarDefault,
          subbar: SubbarPlanner,
          footer: FooterDefault
        },
        props: {
          sidebar: (route) => ({
            sidebarSelected: 'planner',
            subbarSelected: 'schedule',
            deepbarSelected: 'activities'
          }),
          panel: (route) => ({
            activityId: route.params.activityId,
            modifyType: 'edit'
          })
        }
      }
    ]
  }
]
