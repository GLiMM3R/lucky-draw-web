import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: () => import('@/layout/BaseLayout.vue'),
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('@/views/home/index.vue')
        },
        {
          path: '/report',
          name: 'report',
          component: () => import('@/views/report/index.vue')
        },
        {
          path: '/random',
          name: 'random',
          component: () => import('@/views/random/index.vue')
        },
        {
          path: '/wheel',
          name: 'wheel',
          component: () => import('@/views/wheel/index.vue')
        },
        {
          path: '/customization',
          name: 'customization',
          component: () => import('@/views/customization/index.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue')
    }
  ]
})

export default router
