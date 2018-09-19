//Layouts
import LayoutAppPanelSub from '@/components/layout/AppPanelSub';

//Panel
import PanelBudget from '@/components/panel/budget/Budget';

//SubPanel
import SubPanelRecordModify from '@/components/subpanel/records/Modify';

//Subbar
import SubbarPlanner from '@/components/subbar/Planner';

//Navbar
import NavbarDefault from '@/components/navbar/Default';

//Footer
import FooterDefault from '@/components/footer/Default';

export default [
  {
    path: '/records/',
    meta: {
      requiresAuth: true
    },
    component: LayoutAppPanelSub,
    children: [
      {
        path: ':recordId/edit',
        name: 'RecordEdit',
        components: {
          panel: PanelBudget,
          subpanel: SubPanelRecordModify,
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
          }),
          subpanel: (route) => ({
            recordId: route.params.recordId,
            modifyType: 'edit'
          })
        }
      }
    ]
  }
]
