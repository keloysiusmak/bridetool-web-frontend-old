//layout
import AppLayout from '@/components/layout/app-layout'

export default [
  {
    path: '/',
    component: AppLayout,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '/',
        redirect: 'schedules'
      }
    ]
  }
]
