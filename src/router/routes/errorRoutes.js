//Components
import ErrorNotFound from '@/components/error/NotFound';

export default [
  {
    path: '*',
    meta: {
      requiresAuth: false
    },
    component: ErrorNotFound
  }
]
