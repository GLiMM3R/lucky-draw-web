import {
  getAccessToken,
  getRefreshToken,
  isTokenExpired,
  removeAccessToken,
  removeRefreshToken
} from '@/utils/token'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: 'home' },
    {
      path: '/',
      component: () => import('@/layout/BaseLayout.vue'),
      children: [
        {
          path: 'home',
          name: 'homepage',
          component: () => import('@/views/home/HomeView.vue')
        },
        {
          path: 'report',
          name: 'campaign-report',
          component: () => import('@/views/report/ReportView.vue')
        },
        {
          path: 'random',
          component: () => import('@/views/random/RandomView.vue'),
          children: [
            {
              path: '',
              name: 'random-campaign',
              component: () => import('@/views/random/RandomCampaign.vue')
            },
            {
              path: ':slug',
              name: 'random-detail',
              component: () => import('@/views/random/RandomCampaignDetail.vue')
            },
            {
              path: ':slug/report',
              name: 'random-report',
              component: () => import('@/views/random/RandomCampaignReport.vue')
            }
          ]
        },
        {
          path: 'wheel',
          component: () => import('@/views/wheel/WheelView.vue'),
          children: [
            {
              path: '',
              name: 'wheel',
              component: () => import('@/views/wheel/WheelCampaign.vue')
            },
            {
              path: ':slug',
              name: 'wheel-detail',
              component: () => import('@/views/wheel/WheelCampaignDetail.vue')
            },
            {
              path: ':slug/report',
              name: 'wheel-report',
              component: () => import('@/views/wheel/WheelCampaignReport.vue')
            }
          ]
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
  if ((!getAccessToken() || !getRefreshToken()) && to.name !== 'login') next({ name: 'login' })
  else next()
})

export default router
