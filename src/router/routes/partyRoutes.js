//Layouts
import LayoutAppPanel from '@/components/layout/AppPanel';

//Components
import MainParty from '@/components/panel/parties/Party';
import MainPartyModify from '@/components/panel/parties/PartyModify';
import MainWeddingParty from '@/components/panel/parties/WeddingParty';

//Subbar
import SubbarWeddingDay from '@/components/subbar/WeddingDay';

//Navbar
import NavbarDefault from '@/components/navbar/Default';

export default [
  {
    path: '/party',
    meta: {
      requiresAuth: true
    },
    component: LayoutAppPanel,
    children: [
      {
        path: '',
        components: {
          panel: MainWeddingParty,
          navbar: NavbarDefault,
          subbar: SubbarWeddingDay
        },
        props: {
          navbar: (route) => ({
            navbarSelected: 'weddingday'
          }),
          subbar: (route) => ({
            subbarSelected: 'party'
          })
        }
      },
      {
        path: 'create',
        name: 'PartyAdd',
        components: {
          panel: MainPartyModify,
          navbar: NavbarDefault,
          subbar: SubbarWeddingDay
        },
        props:{
          subbar: (route) => ({
            subbarSelected: 'party'
          }),
          panel: (route) => ({
            modifyType: 'create'
          })
        }
      },
      {
        path: ':partyId',
        name: 'PartyOverview',
        components: {
          panel: MainParty,
          navbar: NavbarDefault,
          subbar: SubbarWeddingDay
        },
        props:{
          subbar: (route) => ({
            subbarSelected: 'party'
          }),
          panel: true
        }
      },
      {
        path: ':partyId/edit',
        name: 'PartyEdit',
        components: {
          panel: MainPartyModify,
          navbar: NavbarDefault,
          subbar: SubbarWeddingDay
        },
        props:{
          subbar: (route) => ({
            subbarSelected: 'party'
          }),
          panel: (route) => ({
            partyId: route.params.partyId,
            modifyType: 'edit'
          }),
        }
      }
    ]
  }
]
