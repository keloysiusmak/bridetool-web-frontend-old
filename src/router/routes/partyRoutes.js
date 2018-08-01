//Layouts
import LayoutLeftSidebar from '@/components/layout/LeftSidebar';

//Components
import MainParty from '@/components/panel/parties/Party';
import MainPartyModify from '@/components/panel/parties/PartyModify';
import MainWeddingParty from '@/components/panel/parties/WeddingParty';

import NavbarDefault from '@/components/navbar/Default';

import SidebarDefault from '@/components/sidebar/Default';

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
          sidebar: SidebarDefault
        }
      }
    ]
  },
  {
    path: '/party/create',
    meta: {
      requiresAuth: true
    },
    component: LayoutLeftSidebar,
    children: [
      {
        path: '',
        components: {
          panel: MainPartyModify,
          navbar: NavbarDefault,
          sidebar: SidebarDefault
        },
        props:{
          panel: (route) => ({
            modifyType: 'create'
          })
        }
      }
    ]
  },
  {
    path: '/party/:partyId',
    meta: {
      requiresAuth: true
    },
    component: LayoutLeftSidebar,
    children: [
      {
        path: '',
        name: 'getParty',
        components: {
          panel: MainParty,
          navbar: NavbarDefault,
          sidebar: SidebarDefault
        },
        props:{
          panel: true
        }
      }
    ]
  },
  {
    path: '/party/:partyId/edit',
    meta: {
      requiresAuth: true
    },
    component: LayoutLeftSidebar,
    children: [
      {
        path: '',
        components: {
          panel: MainPartyModify,
          navbar: NavbarDefault,
          sidebar: SidebarDefault
        },
        props:{
          panel: (route) => ({
            partyId: route.params.partyId,
            modifyType: 'edit'
          })
        }
      }
    ]
  }
]
