import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/token'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', 'logout']

router.beforeEach(async(to, from, next) => {
  console.log(to.path + '->' + from.path)
  NProgress.start()
  const hasToken = getToken()
  if (hasToken) {
    console.log('hasToken')
    if (to.path === '/login') {
      console.log('Login重定向/')
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasRole = store.getters.role
      if (hasRole) {
        console.log('hasRole')
        next()
      } else {
        try {
          console.log('getInfo')
          await store.dispatch('getInfo')
          next()
        } catch (error) {
          console.log('get info error')
          await store.dispatch('logout')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    console.log('noToken')
    if (whiteList.indexOf(to.path) !== -1) {
      console.log('白名单')
      next()
    } else {
      console.log('*重定向Login')
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
