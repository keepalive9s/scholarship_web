import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/auth/signin',
    method: 'post',
    params: data
  })
}

export function role() {
  return request({
    url: '/api/auth/role',
    method: 'get'
  })
}

export function admin() {
  return request({
    url: '/api/admin/auth',
    method: 'get'
  })
}

export function counsellor() {
  return request({
    url: '/api/counsellor/auth',
    method: 'get'
  })
}

export function student() {
  return request({
    url: '/api/student/auth',
    method: 'get'
  })
}
