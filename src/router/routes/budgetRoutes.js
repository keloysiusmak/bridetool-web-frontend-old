//Layouts
import LayoutAppPanelSub from '@/components/layout/AppPanelSub';

//Panel
import PanelBudget from '@/components/panel/budget/Budget';

//SubPanel
import SubPanelBudgetOverview from '@/components/subpanel/budget/Overview';
import SubPanelBudgetRecords from '@/components/subpanel/budget/Records';
import SubPanelBudgetModify from '@/components/subpanel/budget/Modify';

//Subbar
import SubbarPlanner from '@/components/subbar/Planner';

//Navbar
import NavbarDefault from '@/components/navbar/Default';

//Footer
import FooterDefault from '@/components/footer/Default';

export default [
  {
    path: '/budget',
    meta: {
      requiresAuth: true
    },
    component: LayoutAppPanelSub,
    children: [
      {
        path: '',
        name: 'BudgetOverview',
        components: {
          panel: PanelBudget,
          subpanel: SubPanelBudgetOverview,
          navbar: NavbarDefault,
          subbar: SubbarPlanner,
          footer: FooterDefault
        },
        props: {
          navbar: (route) => ({
            navbarSelected: 'planner'
          }),
          subbar: (route) => ({
            subbarSelected: 'budget'
          }),
          panel: (route) => ({
            panelSelected: 'overview'
          })
        }
      },
      {
        path: 'records',
        name: 'BudgetRecords',
        components: {
          panel: PanelBudget,
          subpanel: SubPanelBudgetRecords,
          navbar: NavbarDefault,
          subbar: SubbarPlanner,
          footer: FooterDefault
        },
        props: {
          navbar: (route) => ({
            navbarSelected: 'planner'
          }),
          subbar: (route) => ({
            subbarSelected: 'budget'
          }),
          panel: (route) => ({
            panelSelected: 'records'
          })
        }
      },
      {
        path: 'manage',
        name: 'BudgetManage',
        components: {
          panel: PanelBudget,
          subpanel: SubPanelBudgetModify,
          navbar: NavbarDefault,
          subbar: SubbarPlanner,
          footer: FooterDefault
        },
        props: {
          navbar: (route) => ({
            navbarSelected: 'planner'
          }),
          subbar: (route) => ({
            subbarSelected: 'budget'
          }),
          panel: (route) => ({
            panelSelected: 'manage'
          })
        }
      }
    ]
  }
]
