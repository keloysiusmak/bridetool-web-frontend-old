//Layouts
import LayoutAppPanelSub from '@/components/layout/AppPanelSub';

//Panel
import PanelSettingsProfile from '@/components/panel/settings/Profile';
import PanelSettingsSecurity from '@/components/panel/settings/Security';

//SubPanel
import SubPanelSettingsProfile from '@/components/subpanel/settings/Profile';
import SubPanelSettingsSecurity from '@/components/subpanel/settings/Security';
import SubPanelSettingsSwitchUser from '@/components/subpanel/settings/SwitchUser';

//Subbar
import SubbarSettings from '@/components/subbar/Settings';

//Navbar
import NavbarDefault from '@/components/navbar/Default';

//Footer
import FooterDefault from '@/components/footer/Default';

export default [
  {
    path: '/settings',
    meta: {
      requiresAuth: true
    },
    component: LayoutAppPanelSub,
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
          subpanel: SubPanelSettingsProfile,
          navbar: NavbarDefault,
          subbar: SubbarSettings,
          footer: FooterDefault
        },
        props: {
          navbar: (route) => ({
            navbarSelected: 'settings'
          }),
          subbar: (route) => ({
            subbarSelected: 'profile'
          }),
          panel: (route) => ({
            panelSelected: 'email'
          })
        }
      },
      {
        path: 'profile/switchuser',
        components: {
          panel: PanelSettingsProfile,
          subpanel: SubPanelSettingsSwitchUser,
          navbar: NavbarDefault,
          subbar: SubbarSettings,
          footer: FooterDefault
        },
        props: {
          navbar: (route) => ({
            navbarSelected: 'settings'
          }),
          subbar: (route) => ({
            subbarSelected: 'profile'
          }),
          panel: (route) => ({
            panelSelected: 'switchuser'
          })
        }
      },
      {
        path: 'security/password',
        components: {
          panel: PanelSettingsSecurity,
          subpanel: SubPanelSettingsSecurity,
          navbar: NavbarDefault,
          subbar: SubbarSettings,
          footer: FooterDefault
        },
        props: {
          navbar: (route) => ({
            navbarSelected: 'settings'
          }),
          subbar: (route) => ({
            subbarSelected: 'security'
          }),
          panel: (route) => ({
            panelSelected: 'password'
          })
        }
      }
    ]
  }
];
