//Layouts
import LayoutAppPanelSub from '@/components/layout/AppPanelSub';
import LayoutAppPanelOnly from '@/components/layout/AppPanelOnly';

//Panel
import PanelMember from '@/components/panel/members/Member';
import PanelMemberOverview from '@/components/panel/members/Overview';

//SubPanel
import SubPanelMemberOverview from '@/components/subpanel/members/Overview';
import SubPanelMemberTeam from '@/components/subpanel/members/Team';
import SubPanelMemberGroups from '@/components/subpanel/members/Groups';
import SubPanelMemberModify from '@/components/subpanel/members/Modify';

//Subbar
import SubbarPlanner from '@/components/subbar/Planner';

//Navbar
import NavbarDefault from '@/components/navbar/Default';

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
          navbar: NavbarDefault,
          panel: PanelMemberOverview,
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
    component: LayoutAppPanelSub,
    children: [
      {
        path: '',
        name: 'MemberTeam',
        components: {
          panel: PanelMember,
          subpanel: SubPanelMemberTeam,
          navbar: NavbarDefault,
          subbar: SubbarPlanner,
          footer: FooterDefault
        },
        props: {
          navbar: (route) => ({
            navbarSelected: 'planner'
          }),
          subbar: (route) => ({
            subbarSelected: 'member'
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
    component: LayoutAppPanelSub,
    children: [
      {
        path: '',
        redirect: '/members'
      },
      {
        path: 'groups',
        name: 'MemberGroups',
        components: {
          panel: PanelMember,
          subpanel: SubPanelMemberGroups,
          navbar: NavbarDefault,
          subbar: SubbarPlanner,
          footer: FooterDefault
        },
        props: {
          navbar: (route) => ({
            navbarSelected: 'planner'
          }),
          subbar: (route) => ({
            subbarSelected: 'member'
          }),
          panel: (route) => ({
            panelSelected: 'groups'
          })
        }
      },
      {
        path: 'create',
        name: 'MemberAdd',
        components: {
          panel: PanelMember,
          subpanel: SubPanelMemberModify,
          navbar: NavbarDefault,
          subbar: SubbarPlanner,
          footer: FooterDefault
        },
        props:{
          navbar: (route) => ({
            navbarSelected: 'planner'
          }),
          subbar: (route) => ({
            subbarSelected: 'member'
          }),
          panel: (route) => ({
            panelSelected: 'members'
          }),
          subpanel: (route) => ({
            modifyType: 'create'
          })
        }
      },
      {
        path: ':memberId',
        name: 'MemberOverview',
        components: {
          panel: PanelMember,
          subpanel: SubPanelMemberOverview,
          navbar: NavbarDefault,
          subbar: SubbarPlanner,
          footer: FooterDefault
        },
        props:{
          navbar: (route) => ({
            navbarSelected: 'planner'
          }),
          subbar: (route) => ({
            subbarSelected: 'member'
          }),
          panel: (route) => ({
            panelSelected: 'members'
          }),
          subpanel: (route) => ({
            memberId: route.params.memberId
          })
        }
      },
      {
        path: ':memberId/edit',
        name: 'MemberEdit',
        components: {
          panel: PanelMember,
          subpanel: SubPanelMemberModify,
          navbar: NavbarDefault,
          subbar: SubbarPlanner,
          footer: FooterDefault
        },
        props:{
          navbar: (route) => ({
            navbarSelected: 'planner'
          }),
          subbar: (route) => ({
            subbarSelected: 'member'
          }),
          panel: (route) => ({
            panelSelected: 'members'
          }),
          subpanel: (route) => ({
            modifyType: 'edit',
            memberId: route.params.memberId
          })
        }
      }
    ]
  }
]
