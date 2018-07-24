import Vue from 'vue';
import Router from 'vue-router';

import Login from '@/components/Login';
import Dashboard from '@/components/Dashboard';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      components: {
        main: Dashboard,
      },
    },
    {
      path: '/login',
      name: 'Login',
      components: {
        main: Login,
      },
    },
  ],
});
