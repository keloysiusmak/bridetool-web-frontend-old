import Vue from 'vue';
import Router from 'vue-router';
import { store } from '../store';

//routes
import mainRoutes from './routes/mainRoutes'
import loginRoutes from './routes/loginRoutes'

Vue.use(Router);

const router = new Router({
  routes: [
    ...mainRoutes,
    ...loginRoutes
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
