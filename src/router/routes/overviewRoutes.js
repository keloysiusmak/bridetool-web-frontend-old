//Layouts
import LayoutAppPanel from '@/components/layout/AppPanel';

//Panel
import PanelOverview from '@/components/panel/overview/Overview';
import PanelQuickstart from '@/components/panel/overview/Quickstart';

//Subbar
import SubbarDefault from '@/components/subbar/Default';

//Sidebar
import NavbarDefault from '@/components/navbar/Default';

//Footer
import FooterDefault from '@/components/footer/Default';

export default [
  {
    path: '/',
    component: LayoutAppPanel,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        name: 'Overview',
        components: {
          panel: PanelOverview,
          navbar: NavbarDefault,
          subbar: SubbarDefault,
          footer: FooterDefault
        },
        props: {
          navbar: (route) => ({
            navbarSelected: ''
          }),
          subbar: (route) => ({
            subbarSelected: 'overview'
          }),
          subpanel: true
        }
      },
      {
        path: 'quickstart',
        name: 'Quickstart',
        components: {
          panel: PanelQuickstart,
          navbar: NavbarDefault,
          subbar: SubbarDefault,
          footer: FooterDefault
        },
        props: {
          navbar: (route) => ({
            navbarSelected: ''
          }),
          subbar: (route) => ({
            subbarSelected: 'quickstart'
          }),
          subpanel: true
        }
      }
    ]
  }
]
