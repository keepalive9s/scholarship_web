import request from '@/utils/request'

export function create(data) {
  return request({
    url: '/api/application',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/api/application',
    method: 'put',
    data
  })
}

export function publicity() {
  return request({
    url: '/api/application/publicity',
    method: 'get'
  })
}

export function judge(unit) {
  return request({
    url: '/api/application/judge/' + unit,
    method: 'get'
  })
}
