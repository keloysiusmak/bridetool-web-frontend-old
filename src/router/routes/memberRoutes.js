//Layouts
import LayoutAppPanel from '@/components/layout/AppPanel';
import LayoutAppPanelOnly from '@/components/layout/AppPanelOnly';

//Panel
import PanelMemberOverview from '@/components/panel/member/Overview';
import PanelMemberSummary from '@/components/panel/member/Summary';
import PanelMemberTeam from '@/components/panel/member/Team';
import PanelMemberGroups from '@/components/panel/member/Groups';
import PanelMemberModify from '@/components/panel/member/Modify';

//Subbar
import SubbarPlanner from '@/components/subbar/Planner';

//Sidebar
import SidebarDefault from '@/components/sidebar/Default';

//Footer
import FooterDefault from '@/components/footer/Default';

export default [
  {
    path: '/member/:memberId/overview',
    component: LayoutAppPanelOnly,
    children: [
      {
        path: '',
        meta: {
          requiresAuth: false
        },
        components: {
          sidebar: SidebarDefault,
          panel: PanelMemberSummary,
          footer: FooterDefault
        },
        props: {
          panel: (route) => ({
            memberId: route.params.memberId
          })
        }
      }
    ]
  },
  {
    path: '/members',
    meta: {
      requiresAuth: true
    },
    component: LayoutAppPanel,
    children: [
      {
        path: '',
        components: {
          panel: PanelMemberTeam,
          sidebar: SidebarDefault,
          subbar: SubbarPlanner,
          footer: FooterDefault
        },
        props: {
          sidebar: (route) => ({
            sidebarSelected: 'planner',
            subbarSelected: 'member',
            deepbarSelected: 'members'
          }),
          panel: (route) => ({
            panelSelected: 'members'
          })
        }
      }
    ]
  },
  {
    path: '/member',
    meta: {
      requiresAuth: true
    },
    component: LayoutAppPanel,
    children: [
      {
        path: '',
        redirect: '/members'
      },
      {
        path: 'groups',
        components: {
          panel: PanelMemberGroups,
          sidebar: SidebarDefault,
          subbar: SubbarPlanner,
          footer: FooterDefault
        },
        props: {
          sidebar: (route) => ({
            sidebarSelected: 'planner',
            subbarSelected: 'member',
            deepbarSelected: 'members'
          })
        }
      },
      {
        path: 'create',
        name: 'MemberAdd',
        components: {
          panel: PanelMemberModify,
          sidebar: SidebarDefault,
          subbar: SubbarPlanner,
          footer: FooterDefault
        },
        props:{
          sidebar: (route) => ({
            sidebarSelected: 'planner',
            subbarSelected: 'member',
            deepbarSelected: 'members'
          }),
          panel: (route) => ({
            modifyType: 'create'
          })
        }
      },
      {
        path: ':memberId',
        name: 'MemberOverview',
        components: {
          panel: PanelMemberOverview,
          sidebar: SidebarDefault,
          subbar: SubbarPlanner,
          footer: FooterDefault
        },
        props:{
          sidebar: (route) => ({
            sidebarSelected: 'planner',
            subbarSelected: 'member',
            deepbarSelected: 'members'
          }),
          panel: (route) => ({
            memberId: route.params.memberId
          })
        }
      },
      {
        path: ':memberId/edit',
        name: 'MemberEdit',
        components: {
          panel: PanelMemberModify,
          sidebar: SidebarDefault,
          subbar: SubbarPlanner,
          footer: FooterDefault
        },
        props:{
          sidebar: (route) => ({
            sidebarSelected: 'planner',
            subbarSelected: 'member',
            deepbarSelected: 'members'
          }),
          panel: (route) => ({
            modifyType: 'edit',
            memberId: route.params.memberId
          })
        }
      }
    ]
  }
]
