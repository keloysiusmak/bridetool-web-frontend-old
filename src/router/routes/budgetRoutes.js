//Layouts
import LayoutAppPanel from '@/components/layout/AppPanel';

//Panel
import PanelBudgetOverview from '@/components/panel/budget/Overview';
import PanelBudgetRecords from '@/components/panel/budget/Records';
import PanelBudgetModify from '@/components/panel/budget/Modify';
import PanelRecordModify from '@/components/panel/record/Modify';

//Subbar
import SubbarPlanner from '@/components/subbar/Planner';

//Sidebar
import SidebarDefault from '@/components/sidebar/Default';

//Footer
import FooterDefault from '@/components/footer/Default';

export default [
  {
    path: '/budget',
    meta: {
      requiresAuth: true
    },
    component: LayoutAppPanel,
    children: [
      {
        path: '',
        components: {
          panel: PanelBudgetOverview,
          sidebar: SidebarDefault,
          subbar: SubbarPlanner,
          footer: FooterDefault
        },
        props: {
          sidebar: (route) => ({
            sidebarSelected: 'planner',
            subbarSelected: 'budget',
            deepbarSelected: 'overview'
          }),
          panel: (route) => ({
            panelSelected: 'overview'
          })
        }
      },
      {
        path: 'records',
        components: {
          panel: PanelBudgetRecords,
          sidebar: SidebarDefault,
          subbar: SubbarPlanner,
          footer: FooterDefault
        },
        props: {
          sidebar: (route) => ({
            sidebarSelected: 'planner',
            subbarSelected: 'budget',
            deepbarSelected: 'records'
          }),
          panel: (route) => ({
            panelSelected: 'records'
          })
        }
      },
      {
        path: 'manage',
        components: {
          panel: PanelBudgetModify,
          sidebar: SidebarDefault,
          subbar: SubbarPlanner,
          footer: FooterDefault
        },
        props: {
          sidebar: (route) => ({
            sidebarSelected: 'planner',
            subbarSelected: 'budget',
            deepbarSelected: 'manage'
          }),
          panel: (route) => ({
            panelSelected: 'manage'
          })
        }
      },
      {
        path: 'record',
        name: 'RecordAdd',
        components: {
          panel: PanelRecordModify,
          sidebar: SidebarDefault,
          subbar: SubbarPlanner,
          footer: FooterDefault
        },
        props: {
          sidebar: (route) => ({
            sidebarSelected: 'planner',
            subbarSelected: 'budget',
            deepbarSelected: 'records'
          }),
          panel: (route) => ({
            modifyType: 'create'
          })
        }
      }
    ]
  }
]
