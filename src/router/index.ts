import useUser from '@/composables/useUser'
import {
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken
} from '@/utils/token'
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
          component: () => import('@/views/home/HomeView.vue')
        },
        {
          path: '/report',
          name: 'report',
          component: () => import('@/views/report/ReportView.vue')
        },
        {
          path: '/random',
          component: () => import('@/views/random/RandomView.vue'),
          children: [
            {
              path: '/random/',
              name: 'random-camapgin',
              component: () => import('@/views/random/RandomCampaign.vue')
            },
            {
              path: '/random/:slug',
              name: 'random-detail',
              component: () => import('@/views/random/RandomCampaignDetail.vue')
            }
          ]
        },
        {
          path: '/wheel',
          name: 'wheel',
          component: () => import('@/views/wheel/WheelView.vue')
        },
        {
          path: '/customization',
          name: 'customization',
          component: () => import('@/views/customization/CustomizationView.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/LoginView.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const { state } = useUser()
  if ((!getAccessToken() || !getRefreshToken()) && to.name !== 'login') next({ name: 'login' })
  else next()
})

export default router
