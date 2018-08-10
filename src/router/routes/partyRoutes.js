//Layouts
import LayoutAppPanelSub from '@/components/layout/AppPanelSub';

//Panel
import PanelParty from '@/components/panel/parties/Party';

//SubPanel
import SubPanelPartyOverview from '@/components/subpanel/parties/Overview';
import SubPanelPartyParties from '@/components/subpanel/parties/Parties';
import SubPanelPartyGroups from '@/components/subpanel/parties/Groups';
import SubPanelWeddingParty from '@/components/subpanel/parties/WeddingParty';
import SubPanelPartyModify from '@/components/subpanel/parties/Modify';

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
    component: LayoutAppPanelSub,
    children: [
      {
        path: '',
        redirect: 'parties'
      },
      {
        path: 'parties',
        name: 'PartyParties',
        components: {
          panel: PanelParty,
          subpanel: SubPanelPartyParties,
          navbar: NavbarDefault,
          subbar: SubbarWeddingDay
        },
        props: {
          navbar: (route) => ({
            navbarSelected: 'weddingday'
          }),
          subbar: (route) => ({
            subbarSelected: 'party'
          }),
          panel: (route) => ({
            panelSelected: 'parties'
          })
        }
      },
      {
        path: 'groups',
        name: 'PartyGroups',
        components: {
          panel: PanelParty,
          subpanel: SubPanelPartyGroups,
          navbar: NavbarDefault,
          subbar: SubbarWeddingDay
        },
        props: {
          navbar: (route) => ({
            navbarSelected: 'weddingday'
          }),
          subbar: (route) => ({
            subbarSelected: 'party'
          }),
          panel: (route) => ({
            panelSelected: 'groups'
          })
        }
      },
      {
        path: 'create',
        name: 'PartyAdd',
        components: {
          panel: PanelParty,
          subpanel: SubPanelPartyModify,
          navbar: NavbarDefault,
          subbar: SubbarWeddingDay
        },
        props:{
          navbar: (route) => ({
            navbarSelected: 'weddingday'
          }),
          subbar: (route) => ({
            subbarSelected: 'party'
          }),
          panel: (route) => ({
            panelSelected: 'parties'
          }),
          subpanel: (route) => ({
            modifyType: 'create'
          })
        }
      },
      {
        path: ':partyId',
        name: 'PartyOverview',
        components: {
          panel: PanelParty,
          subpanel: SubPanelPartyOverview,
          navbar: NavbarDefault,
          subbar: SubbarWeddingDay
        },
        props:{
          navbar: (route) => ({
            navbarSelected: 'weddingday'
          }),
          subbar: (route) => ({
            subbarSelected: 'party'
          }),
          panel: (route) => ({
            panelSelected: 'parties'
          }),
          subpanel: (route) => ({
            partyId: route.params.partyId
          })
        }
      },
      {
        path: ':partyId/edit',
        name: 'PartyEdit',
        components: {
          panel: PanelParty,
          subpanel: SubPanelPartyModify,
          navbar: NavbarDefault,
          subbar: SubbarWeddingDay
        },
        props:{
          navbar: (route) => ({
            navbarSelected: 'weddingday'
          }),
          subbar: (route) => ({
            subbarSelected: 'party'
          }),
          panel: (route) => ({
            panelSelected: 'parties'
          }),
          subpanel: (route) => ({
            modifyType: 'edit',
            partyId: route.params.partyId
          })
        }
      }
    ]
  }
]
