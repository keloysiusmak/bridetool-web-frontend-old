import Vue from 'vue';
import Router from 'vue-router';
import { store } from '../store';

//routes
import errorRoutes from './routes/errorRoutes'
import activityRoutes from './routes/activityRoutes'
import budgetRoutes from './routes/budgetRoutes'
import loginRoutes from './routes/loginRoutes'
import overviewRoutes from './routes/overviewRoutes'
import memberRoutes from './routes/memberRoutes'
import recordRoutes from './routes/recordRoutes'
import scheduleRoutes from './routes/scheduleRoutes'
import settingsRoutes from './routes/settingsRoutes'


Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    ...overviewRoutes,
    ...activityRoutes,
    ...budgetRoutes,
    ...loginRoutes,
    ...memberRoutes,
    ...recordRoutes,
    ...scheduleRoutes,
    ...settingsRoutes,
    ...errorRoutes
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
