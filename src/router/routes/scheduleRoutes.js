//Layouts
import LayoutAppPanel from '@/components/layout/AppPanel';

//Panel
import PanelScheduleActivities from '@/components/panel/schedule/Activities';
import PanelScheduleTimeline from '@/components/panel/schedule/Timeline';
import PanelScheduleModify from '@/components/panel/schedule/Modify';
import PanelActivityModify from '@/components/panel/activity/Modify';

//Subbar
import SubbarPlanner from '@/components/subbar/Planner';

//Sidebar
import SidebarDefault from '@/components/sidebar/Default';

//Footer
import FooterDefault from '@/components/footer/Default';

export default [
  {
    path: '/schedule',
    meta: {
      requiresAuth: true
    },
    component: LayoutAppPanel,
    children: [
      {
        path: '',
        redirect: 'timeline'
      },
      {
        path: 'timeline',
        components: {
          panel: PanelScheduleTimeline,
          sidebar: SidebarDefault,
          subbar: SubbarPlanner,
          footer: FooterDefault
        },
        props: {
          sidebar: (route) => ({
            sidebarSelected: 'planner',
            subbarSelected: 'schedule',
            deepbarSelected: 'timeline'
          }),
          panel: true
        }
      },
      {
        path: 'activities',
        components: {
          panel: PanelScheduleActivities,
          sidebar: SidebarDefault,
          subbar: SubbarPlanner,
          footer: FooterDefault
        },
        props: {
          sidebar: (route) => ({
            sidebarSelected: 'planner',
            subbarSelected: 'schedule',
            deepbarSelected: 'activities'
          })
        }
      },
      {
        path: 'manage',
        components: {
          panel: PanelScheduleModify,
          sidebar: SidebarDefault,
          subbar: SubbarPlanner,
          footer: FooterDefault
        },
        props: {
          sidebar: (route) => ({
            sidebarSelected: 'planner',
            subbarSelected: 'schedule',
            deepbarSelected: 'manage'
          }),
          panel: (route) => ({
            scheduleId: route.params.scheduleId
          })
        }
      },
      {
        path: 'activity',
        name: 'ActivityAdd',
        components: {
          panel: PanelActivityModify,
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
            scheduleId: route.params.scheduleId,
            modifyType: 'create'
          })
        }
      }
    ]
  }
]
