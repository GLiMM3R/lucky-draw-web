import { getAccessToken, getRefreshToken } from '@/utils/token'
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
          name: 'home',
          component: () => import('@/views/home/HomeView.vue'),
          meta: {
            pageTitle: 'Jmart',
            breadcrumb: [
              {
                title: 'Home',
                disabled: true,
                href: '/'
              }
            ]
          }
        },
        {
          path: 'report',
          name: 'report',
          component: () => import('@/views/report/ReportView.vue'),
          meta: {
            pageTitle: 'pageTitle.report',
            breadcrumb: [
              {
                title: 'breadcrumbs.home',
                disabled: false,
                href: '/'
              },
              {
                title: 'breadcrumbs.report',
                disabled: true,
                href: '/report'
              }
            ]
          }
        },
        {
          path: 'random',
          component: () => import('@/views/random/RandomView.vue'),
          children: [
            {
              path: '',
              name: 'random-campaign',
              component: () => import('@/views/random/RandomCampaign.vue'),
              meta: {
                pageTitle: 'pageTitle.random',
                breadcrumb: [
                  {
                    title: 'breadcrumbs.home',
                    disabled: false,
                    href: '/'
                  },
                  {
                    title: 'breadcrumbs.random',
                    disabled: true,
                    href: '/random'
                  }
                ]
              }
            },
            {
              path: ':slug',
              name: 'random-detail',
              component: () => import('@/views/random/RandomCampaignDetail.vue'),
              meta: {
                pageTitle: ':slug',
                breadcrumb: [
                  {
                    title: 'breadcrumbs.home',
                    disabled: false,
                    href: '/'
                  },
                  {
                    title: 'breadcrumbs.random',
                    disabled: false,
                    href: '/random'
                  },
                  {
                    title: ':slug',
                    disabled: true,
                    href: '/random/:slug'
                  }
                ]
              },
              beforeEnter: (to, from, next) => {
                to.meta.pageTitle = `${to.params.slug}`
                to.meta.breadcrumb[2].title = `${to.params.slug}`
                to.meta.breadcrumb[2].href = `/random/${to.params.slug}`
                next()
              }
            },
            {
              path: 'report/:slug',
              name: 'random-report',
              component: () => import('@/views/random/RandomCampaignReport.vue'),
              meta: {
                pageTitle: 'pageTitle.report',
                breadcrumb: [
                  {
                    title: 'breadcrumbs.home',
                    disabled: false,
                    href: '/'
                  },
                  {
                    title: 'breadcrumbs.random',
                    disabled: false,
                    href: '/random'
                  },
                  {
                    title: 'breadcrumbs.report',
                    disabled: false,
                    href: '/random'
                  },
                  {
                    title: ':slug',
                    disabled: true,
                    href: '/reports/:slug'
                  }
                ]
              },
              beforeEnter: (to, from, next) => {
                to.meta.breadcrumb[3].title = `${to.params.slug}`
                to.meta.breadcrumb[3].href = `/report/${to.params.slug}`
                next()
              }
            }
          ]
        },
        {
          path: 'wheel',
          component: () => import('@/views/wheel/WheelView.vue'),
          children: [
            {
              path: '',
              name: 'wheel-campaign',
              component: () => import('@/views/wheel/WheelCampaign.vue'),
              meta: {
                pageTitle: 'pageTitle.wheel',
                breadcrumb: [
                  {
                    title: 'breadcrumbs.home',
                    disabled: false,
                    href: '/'
                  },
                  {
                    title: 'breadcrumbs.wheel',
                    disabled: true,
                    href: '/wheel'
                  }
                ]
              }
            },
            {
              path: ':slug',
              name: 'wheel-detail',
              component: () => import('@/views/wheel/WheelCampaignDetail.vue'),
              meta: {
                pageTitle: ':slug',
                breadcrumb: [
                  {
                    title: 'breadcrumbs.home',
                    disabled: false,
                    href: '/'
                  },
                  {
                    title: 'breadcrumbs.wheel',
                    disabled: false,
                    href: '/wheel'
                  },
                  {
                    title: ':slug',
                    disabled: true,
                    href: '/wheel/:slug'
                  }
                ]
              },
              beforeEnter: (to, from, next) => {
                to.meta.pageTitle = `${to.params.slug}`
                to.meta.breadcrumb[2].title = `${to.params.slug}`
                to.meta.breadcrumb[2].href = `/wheel/${to.params.slug}`
                next()
              }
            },
            {
              path: 'report/:slug',
              name: 'wheel-report',
              component: () => import('@/views/wheel/WheelCampaignReport.vue'),
              meta: {
                pageTitle: 'pageTitle.report',
                breadcrumb: [
                  {
                    title: 'breadcrumbs.home',
                    disabled: false,
                    href: '/'
                  },
                  {
                    title: 'breadcrumbs.wheel',
                    disabled: false,
                    href: '/wheel'
                  },
                  {
                    title: 'breadcrumbs.report',
                    disabled: false,
                    href: '/wheel'
                  },
                  {
                    title: ':slug',
                    disabled: true,
                    href: '/wheel/report/:slug'
                  }
                ]
              },
              beforeEnter: (to, from, next) => {
                to.meta.breadcrumb[3].title = `${to.params.slug}`
                to.meta.breadcrumb[3].href = `/wheel/report/${to.params.slug}`
                next()
              }
            }
          ]
        }
        // {
        //   path: '/customization',
        //   name: 'customization',
        //   component: () => import('@/views/customization/CustomizationView.vue')
        // }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/LoginView.vue')
    },
    {
      path: '/random/:slug/:prizeId/mobile',
      name: 'random-live-mobile',
      component: () => import('@/views/random/RandomLivePageForMobile.vue')
    },
    {
      path: '/random/:slug/:prizeId/desktop',
      name: 'random-live-desktop',
      component: () => import('@/views/random/RandomLivePageForDesktop.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  if ((!getAccessToken() || !getRefreshToken()) && to.name !== 'login') next({ name: 'login' })
  else next()
})

export default router
