import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/',
    redirect: () => {
      if (store.getters.role === 'ROLE_ADMIN') { return '/admin' }
      if (store.getters.role === 'ROLE_STUDENT') { return '/student' }
      if (store.getters.role === 'ROLE_COUNSELLOR') { return '/counsellor' }
    }
  },
  {
    path: '/admin',
    component: () => import('@/views/admin/index'),
    redirect: '/admin/scholarship',
    children: [
      {
        name: 'unit',
        path: 'unit',
        component: () => import('@/views/admin/unit')
      },
      {
        name: 'scholarship',
        path: 'scholarship',
        component: () => import('@/views/admin/scholarship')
      },
      {
        name: 'counsellor',
        path: 'counsellor',
        component: () => import('@/views/admin/counsellor')
      },
      {
        name: 'password',
        path: 'password',
        component: () => import('@/views/admin/password')
      }
    ]
  },
  {
    path: '/counsellor',
    component: () => import('@/views/counsellor/index'),
    redirect: '/counsellor/student',
    children: [
      {
        name: 'student',
        path: 'student',
        component: () => import('@/views/counsellor/student')
      },
      {
        name: 'grade',
        path: 'grade',
        component: () => import('@/views/counsellor/grade')
      }
    ]
  },
  {
    path: '/student',
    component: () => import('@/views/student/index'),
    redirect: '/student/profile',
    children: [
      {
        name: 'profile',
        path: 'profile',
        component: () => import('@/views/student/profile')
      },
      {
        name: 'scholarship',
        path: 'scholarship',
        component: () => import('@/views/student/scholarship')
      },
      {
        name: 'public',
        path: 'public',
        component: () => import('@/views/student/public')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
