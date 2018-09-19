//Layouts
import LayoutAppPanel from '@/components/layout/AppPanel';

//Panel
import PanelOverview from '@/components/panel/overview/Overview';
import PanelQuickstart from '@/components/panel/overview/Quickstart';
import PanelAbout from '@/components/panel/overview/About';
import PanelTeam from '@/components/panel/overview/Team';
import PanelCareers from '@/components/panel/overview/Careers';
import PanelPartners from '@/components/panel/overview/Partners';
import PanelBlog from '@/components/panel/overview/Blog';

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
      },
      {
        path: 'about',
        name: 'About',
        components: {
          panel: PanelAbout,
          navbar: NavbarDefault,
          footer: FooterDefault
        }
      },
      {
        path: 'team',
        name: 'Team',
        components: {
          panel: PanelTeam,
          navbar: NavbarDefault,
          footer: FooterDefault
        }
      },
      {
        path: 'careers',
        name: 'Careers',
        components: {
          panel: PanelCareers,
          navbar: NavbarDefault,
          footer: FooterDefault
        }
      },
      {
        path: 'blog',
        name: 'Blog',
        components: {
          panel: PanelBlog,
          navbar: NavbarDefault,
          footer: FooterDefault
        }
      },
      {
        path: 'partners',
        name: 'Partners',
        components: {
          panel: PanelPartners,
          navbar: NavbarDefault,
          footer: FooterDefault
        }
      }
    ]
  }
]
