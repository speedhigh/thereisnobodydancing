import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '../components/Layout/index.vue'
import Message from '/src/components/Message/Message.js'

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
        component:() => import('../views/business/stats.vue'),
        meta: { name: 'Business' }
      },
      // 业务下发
      {
        path: '/business/issuance',
        name: 'BusinessIssuance',
        component:() => import('../views/business/issuance.vue'),
        meta: { name: 'Business' }
      },
      // 业务详情
      {
        path: '/business/detail/:id',
        name: 'BusinessDetail',
        component:() => import('../views/business/detail.vue'),
        meta: { name: 'Business' }
      }
    ]
  },
  /** ----- 客户管理 ----- **/
  {
    path: '/customer',
    component: Layout,
    redirect: '/customer/register',
    children: [
      // 客户登记
      {
        path: '/customer/register',
        name: 'CustomerRegister',
        component:() => import('../views/customer/register.vue'),
        meta: { name: 'Customer' }
      },
      // 客户查询
      {
        path: '/customer/search',
        name: 'CustomerSearch',
        component:() => import('../views/customer/search.vue'),
        meta: { name: 'Customer' }
      },
      // 客户业务统计
      {
        path: '/customer/stats',
        name: 'CustomerStats',
        component:() => import('../views/customer/stats.vue'),
        meta: { name: 'Customer' }
      }
    ]
  },
  /** ----- 用户管理 ----- **/
  {
    path: '/user',
    component: Layout,
    redirect: '/user/information',
    children: [
      // 个人信息
      {
        path: '/user/information',
        name: 'UserInformation',
        component:() => import('../views/user/index.vue'),
        meta: { name: 'User' }
      }
    ]
  },
  /** -------404------- **/
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component:() => import('../views/404/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to,from,next) => {
  if(to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem("token")
  if(!tokenStr) {
    Message({ text: '请先登录', type: 'warn' })
    next('/login')
    return
  }
  next()
})

export default router