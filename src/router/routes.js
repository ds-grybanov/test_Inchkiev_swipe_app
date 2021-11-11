import { ROUTES } from '../constants';

export default [
  {
    path: '/',
    name: ROUTES.HOME,
    component: () => import('../pages/home/Home.vue')
  },
  {
    path: '/main',
    name: ROUTES.MAIN,
    component: () => import('../pages/main/Main.vue')
  },
  {
    path: '/result',
    name: ROUTES.RESULT,
    component: () => import('../pages/result/Result.vue')
  }
]