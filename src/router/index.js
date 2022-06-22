import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '../components/Layout/index.vue'

const routes= [
  {
    path: '/',
    redirect: '/main'
  },
  /** -----登录页----- **/
  {
    path: '/login',
    name: 'Login',
    component:() => import('../views/login/index.vue')
  },
  /** ----- 业务管理（首页） ----- **/
  {
    path: '/main',
    component: Layout,
    redirect: '/business/stats',
    children: [
      // 业务统计
      {
        path: '/business/stats',
        name: 'BusinessStats',
        component:() => import('../views/business/index.vue'),
        meta: { name: 'Business' }
      },
      // 业务下发
      {
        path: '/business/issuance',
        name: 'BusinessIssuance',
        component:() => import('../views/business/issuance.vue'),
        meta: { name: 'Business' }
      },
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router