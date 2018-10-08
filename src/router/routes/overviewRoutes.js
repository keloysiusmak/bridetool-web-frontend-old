//Layouts
import LayoutAppPanel from '@/components/layout/AppPanel';

//Panel
import PanelNotifications from '@/components/panel/overview/Notifications';
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
import SidebarDefault from '@/components/sidebar/Default';

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
          sidebar: SidebarDefault,
          subbar: SubbarDefault,
          footer: FooterDefault
        },
        props: {
          sidebar: (route) => ({
            sidebarSelected: 'dashboard',
            subbarSelected: 'none'
          }),
          subpanel: true
        }
      },
      {
        path: 'notifications',
        name: 'Notifications',
        components: {
          panel: PanelNotifications,
          sidebar: SidebarDefault,
          subbar: SubbarDefault,
          footer: FooterDefault
        },
        props: {
          sidebar: (route) => ({
            sidebarSelected: 'dashboard',
            subbarSelected: 'none'
          }),
          subpanel: true
        }
      },
      {
        path: 'quickstart',
        components: {
          panel: PanelQuickstart,
          sidebar: SidebarDefault,
          subbar: SubbarDefault,
          footer: FooterDefault
        },
        props: {
          sidebar: (route) => ({
            sidebarSelected: '',
            subbarSelected: 'none'
          }),
          subpanel: true
        }
      },
      {
        path: 'about',
        components: {
          panel: PanelAbout,
          sidebar: SidebarDefault,
          footer: FooterDefault
        }
      },
      {
        path: 'team',
        components: {
          panel: PanelTeam,
          sidebar: SidebarDefault,
          footer: FooterDefault
        }
      },
      {
        path: 'careers',
        components: {
          panel: PanelCareers,
          sidebar: SidebarDefault,
          footer: FooterDefault
        }
      },
      {
        path: 'blog',
        components: {
          panel: PanelBlog,
          sidebar: SidebarDefault,
          footer: FooterDefault
        }
      },
      {
        path: 'partners',
        components: {
          panel: PanelPartners,
          sidebar: SidebarDefault,
          footer: FooterDefault
        }
      }
    ]
  }
]
