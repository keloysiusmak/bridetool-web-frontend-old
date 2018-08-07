//Layouts
import LayoutAppPanelSub from '@/components/layout/AppPanelSub';

//Panel
import PanelSchedule from '@/components/panel/schedules/Schedule';

//SubPanel
import SubPanelActivitiesActivity from '@/components/subpanel/activities/Activity';
import SubPanelActivitiesModify from '@/components/subpanel/activities/Modify';

//Subbar
import SubbarWeddingDay from '@/components/subbar/WeddingDay';

//Navbar
import NavbarDefault from '@/components/navbar/Default';

export default [
  {
    path: '/activities/',
    meta: {
      requiresAuth: true
    },
    component: LayoutAppPanelSub,
    children: [
      {
        path: ':activityId',
        name: 'Activity',
        components: {
          panel: PanelSchedule,
          subpanel: SubPanelActivitiesActivity,
          navbar: NavbarDefault,
          subbar: SubbarWeddingDay
        },
        props:{
          navbar: (route) => ({
            navbarSelected: 'weddingday'
          }),
          subbar: (route) => ({
            subbarSelected: 'schedule'
          }),
          panel: (route) => ({
            activityId: route.params.activityId,
            panelSelected: 'activities'
          })
        }
      },
      {
        path: ':activityId/edit',
        name: 'ActivityEdit',
        components: {
          panel: PanelSchedule,
          subpanel: SubPanelActivitiesModify,
          navbar: NavbarDefault,
          subbar: SubbarWeddingDay
        },
        props: {
          navbar: (route) => ({
            navbarSelected: 'weddingday'
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
