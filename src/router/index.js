import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'
// createWebHashHistory 哈希模式(地址栏带#)
const router = createRouter({
  // 参数可配置为url前缀 /var/*
  history: createWebHistory(import.meta.env.BASE_URL), // vue2中用的是mode: history
  routes: [
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') },
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/article/manage',
      children: [
        {
          path: '/article/manage',
          component: () => import('@/views/article/ArticleManage.vue')
        },
        {
          path: '/article/channel',
          component: () => import('@/views/article/ArticleChannel.vue')
        },
        {
          path: '/user/profile',
          component: () => import('@/views/user/UserProfile.vue')
        },
        {
          path: '/user/avatar',
          component: () => import('@/views/user/UserAvatar.vue')
        },
        {
          path: '/user/password',
          component: () => import('@/views/user/UserPassword.vue')
        }
      ]
    }
  ]
})

// 登录访问拦截 默认放行, 之前是用next放行
// 根据返回值进行拦截
// true || undefined 都放行
// false 拦截回去
// 具体路径
router.beforeEach((to) => {
  const userStore = useUserStore()
  if (!userStore.token && to.path !== '/login') return '/login'
})

export default router
