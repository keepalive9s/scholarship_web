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
      const role = store.getters.role
      if (role === 'ROLE_ADMIN') {
        return '/admin'
      } else if (role === 'ROLE_STUDENT') {
        return '/student'
      } else if (role === 'ROLE_COUNSELLOR') {
        return '/counsellor'
      } else {
        store.dispatch('logout').then(() => {
          return '/login'
        })
      }
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
        name: 'system',
        path: 'system',
        component: () => import('@/views/admin/system')
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
      },
      {
        name: 'judge',
        path: 'judge',
        component: () => import('@/views/counsellor/judge')
      },
      {
        name: 'password',
        path: 'password',
        component: () => import('@/views/counsellor/password')
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
      },
      {
        name: 'password',
        path: 'password',
        component: () => import('@/views/student/password')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
