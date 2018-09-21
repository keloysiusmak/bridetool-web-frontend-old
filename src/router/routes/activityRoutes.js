//Layouts
import LayoutAppPanelSub from '@/components/layout/AppPanelSub';

//Panel
import PanelSchedule from '@/components/panel/schedules/Schedule';

//SubPanel
import SubPanelActivitiesModify from '@/components/subpanel/activities/Modify';

//Subbar
import SubbarPlanner from '@/components/subbar/Planner';

//Navbar
import NavbarDefault from '@/components/navbar/Default';

//Footer
import FooterDefault from '@/components/footer/Default';

export default [
  {
    path: '/activities/',
    meta: {
      requiresAuth: true
    },
    component: LayoutAppPanelSub,
    children: [
      {
        path: ':activityId/edit',
        name: 'ActivityEdit',
        components: {
          panel: PanelSchedule,
          subpanel: SubPanelActivitiesModify,
          navbar: NavbarDefault,
          subbar: SubbarPlanner,
          footer: FooterDefault
        },
        props: {
          navbar: (route) => ({
            navbarSelected: 'planner'
          }),
          subbar: (route) => ({
            subbarSelected: 'schedule'
          }),
          panel: (route) => ({
            panelSelected: 'activities'
          }),
          subpanel: (route) => ({
            activityId: route.params.activityId,
            modifyType: 'edit'
          })
        }
      }
    ]
  }
]
