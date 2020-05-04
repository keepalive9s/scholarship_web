import request from '@/utils/request'

export function auth(data) {
  return request({
    url: '/api/user/auth',
    method: 'post',
    params: data
  })
}

export function info() {
  return request({
    url: '/api/user/info',
    method: 'get'
  })
}
