//Layouts
import LayoutAppPanelSub from '@/components/layout/AppPanelSub';

//Panel
import PanelSchedule from '@/components/panel/schedules/Schedule';

//SubPanel
import SubPanelSchedulesActivities from '@/components/subpanel/schedules/Activities';
import SubPanelSchedulesTimeline from '@/components/subpanel/schedules/Timeline';
import SubPanelSchedulesModify from '@/components/subpanel/schedules/Modify';
import SubPanelActivityModify from '@/components/subpanel/activities/Modify';

//Subbar
import SubbarPlanner from '@/components/subbar/Planner';

//Navbar
import NavbarDefault from '@/components/navbar/Default';

//Footer
import FooterDefault from '@/components/footer/Default';

export default [
  {
    path: '/schedule',
    meta: {
      requiresAuth: true
    },
    component: LayoutAppPanelSub,
    children: [
      {
        path: '',
        redirect: 'timeline'
      },
      {
        path: 'activities',
        name: 'ScheduleActivities',
        components: {
          panel: PanelSchedule,
          subpanel: SubPanelSchedulesActivities,
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
          subpanel: true
        }
      },
      {
        path: 'timeline',
        name: 'ScheduleTimeline',
        components: {
          panel: PanelSchedule,
          subpanel: SubPanelSchedulesTimeline,
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
            panelSelected: 'timeline'
          }),
          subpanel: true
        }
      },
      {
        path: 'manage',
        name: 'ScheduleManage',
        components: {
          panel: PanelSchedule,
          subpanel: SubPanelSchedulesModify,
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
            panelSelected: 'manage'
          }),
          subpanel: (route) => ({
            scheduleId: route.params.scheduleId
          })
        }
      },
      {
        path: 'activity',
        name: 'ActivityAdd',
        components: {
          panel: PanelSchedule,
          subpanel: SubPanelActivityModify,
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
            scheduleId: route.params.scheduleId,
            modifyType: 'create'
          })
        }
      }
    ]
  }
]
