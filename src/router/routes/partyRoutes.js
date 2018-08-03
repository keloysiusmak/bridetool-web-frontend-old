//Layouts
import LayoutLeftSidebar from '@/components/layout/LeftSidebar';

//Components
import MainParty from '@/components/panel/parties/Party';
import MainPartyModify from '@/components/panel/parties/PartyModify';
import MainWeddingParty from '@/components/panel/parties/WeddingParty';
import NavbarDefault from '@/components/navbar/Default';
import SidebarParty from '@/components/sidebar/parties/Party';

export default [
  {
    path: '/party',
    meta: {
      requiresAuth: true
    },
    component: LayoutLeftSidebar,
    children: [
      {
        path: '',
        components: {
          panel: MainWeddingParty,
          navbar: NavbarDefault,
          sidebar: SidebarParty
        },
        props: {
          navbar: (route) => ({
            navbarSelected: 'party'
          }),
          sidebar: (route) => ({
            sidebarSelected: 'partyoverview'
          })
        }
      },
      {
        path: 'create',
        components: {
          panel: MainPartyModify,
          navbar: NavbarDefault,
          sidebar: SidebarParty
        },
        props:{
          navbar: (route) => ({
            navbarSelected: 'party'
          }),
          panel: (route) => ({
            modifyType: 'create'
          }),
          sidebar: (route) => ({
            sidebarSelected: 'createparty'
          })
        }
      },
      {
        path: ':partyId',
        name: 'getParty',
        components: {
          panel: MainParty,
          navbar: NavbarDefault,
          sidebar: SidebarParty
        },
        props:{
          navbar: (route) => ({
            navbarSelected: 'party'
          }),
          panel: true,
          sidebar: (route) => ({
            sidebarSelected: 'partyoverview',
            partyId: route.params.partyId
          })
        }
      },
      {
        path: ':partyId/edit',
        components: {
          panel: MainPartyModify,
          navbar: NavbarDefault,
          sidebar: SidebarParty
        },
        props:{
          navbar: (route) => ({
            navbarSelected: 'party'
          }),
          panel: (route) => ({
            partyId: route.params.partyId,
            modifyType: 'edit'
          }),
          sidebar: (route) => ({
            sidebarSelected: 'partyoverview'
          })
        }
      }
    ]
  }
]
