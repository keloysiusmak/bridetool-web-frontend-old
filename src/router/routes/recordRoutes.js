//Layouts
import LayoutAppPanel from '@/components/layout/AppPanel';

//Panel
import PanelRecordModify from '@/components/panel/record/Modify';

//Subbar
import SubbarPlanner from '@/components/subbar/Planner';

//Sidebar
import SidebarDefault from '@/components/sidebar/Default';

//Footer
import FooterDefault from '@/components/footer/Default';

export default [
  {
    path: '/records/',
    meta: {
      requiresAuth: true
    },
    component: LayoutAppPanel,
    children: [
      {
        path: ':recordId/edit',
        name: 'RecordEdit',
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
            recordId: route.params.recordId,
            modifyType: 'edit'
          })
        }
      }
    ]
  }
]
