import Vue from 'vue';
import Router from 'vue-router';
import { store } from '../store';

//routes
import mainRoutes from './routes/mainRoutes'
import loginRoutes from './routes/loginRoutes'
import scheduleRoutes from './routes/scheduleRoutes'
import settingsRoutes from './routes/settingsRoutes'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    ...mainRoutes,
    ...loginRoutes,
    ...scheduleRoutes,
    ...settingsRoutes
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.accessToken) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else {
    next()
  }
});

export default router;
