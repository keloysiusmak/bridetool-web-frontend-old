//Layouts
import LayoutAppPanel from '@/components/layout/AppPanel';

//Panel
import PanelSettingsProfile from '@/components/panel/settings/Profile';
import PanelSettingsSecurity from '@/components/panel/settings/Security';

//Subbar
import SubbarSettings from '@/components/subbar/Settings';

//Sidebar
import SidebarDefault from '@/components/sidebar/Default';

//Footer
import FooterDefault from '@/components/footer/Default';

export default [
  {
    path: '/settings',
    meta: {
      requiresAuth: true
    },
    component: LayoutAppPanel,
    children: [
      {
        path: '',
        redirect: '/settings/profile/email'
      },
      {
        path: 'profile',
        redirect: '/settings/profile/email'
      },
      {
        path: 'security',
        redirect: '/settings/security/password'
      },
      {
        path: 'profile/email',
        components: {
          panel: PanelSettingsProfile,
          sidebar: SidebarDefault,
          subbar: SubbarSettings,
          footer: FooterDefault
        },
        props: {
          sidebar: (route) => ({
            sidebarSelected: 'settings',
            subbarSelected: 'profile',
            deepbarSelected: 'email'
          })
        }
      },
      {
        path: 'security/password',
        components: {
          panel: PanelSettingsSecurity,
          sidebar: SidebarDefault,
          subbar: SubbarSettings,
          footer: FooterDefault
        },
        props: {
          sidebar: (route) => ({
            sidebarSelected: 'settings',
            subbarSelected: 'security',
            deepbarSelected: 'password'
          })
        }
      }
    ]
  }
];
