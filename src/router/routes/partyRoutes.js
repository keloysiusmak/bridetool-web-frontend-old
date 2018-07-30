//Layout
import AppLayout from '@/components/layout/app-layout'

//Components
import MainParty from '@/components/main/parties/Party';
import MainPartyModify from '@/components/main/parties/PartyModify';
import MainWeddingParty from '@/components/main/parties/WeddingParty';

import NavDefault from '@/components/nav/Default';

import SidebarDefault from '@/components/sidebar/Default';

export default [
  {
    path: '/party',
    meta: {
      requiresAuth: true
    },
    component: AppLayout,
    children: [
      {
        path: '',
        components: {
          main: MainWeddingParty,
          nav: NavDefault,
          sidebar: SidebarDefault
        }
      },
      {
        path: 'create',
        components: {
          main: MainPartyModify,
          nav: NavDefault,
          sidebar: SidebarDefault
        },
        props:{
          main: (route) => ({
            modifyType: 'create'
          })
        }
      },
      {
        path: ':partyId',
        name: 'getParty',
        components: {
          main: MainParty,
          nav: NavDefault,
          sidebar: SidebarDefault
        },
        props:{
          main: true
        }
      },
      {
        path: ':partyId/edit',
        components: {
          main: MainPartyModify,
          nav: NavDefault,
          sidebar: SidebarDefault
        },
        props:{
          main: (route) => ({
            partyId: route.params.partyId,
            modifyType: 'edit'
          })
        }
      }
    ]
  }
]
