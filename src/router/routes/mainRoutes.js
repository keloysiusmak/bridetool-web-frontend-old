//Layouts
import LayoutSinglePanelWithNav from '@/components/layout/SinglePanelWithNav';

//Components
import MainWelcomeCouple from '@/components/panel/default/WelcomeCouple';
import NavbarDefault from '@/components/navbar/Default';

export default [
  {
    path: '/',
    component: LayoutSinglePanelWithNav,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '/',
        redirect: 'schedules'
      },
      {
        path: 'welcome',
        components: {
          panel: MainWelcomeCouple,
          navbar: NavbarDefault
        },
        props: {
          navbar: (route) => ({
            navbarSelected: 'account'
          }),
        }
      }
    ]
  }
]
