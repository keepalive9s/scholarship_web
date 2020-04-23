import request from '@/utils/request'

export function create(data) {
  return request({
    url: '/api/scholarship',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: '/api/scholarship/' + id,
    method: 'delete'
  })
}

export function list() {
  return request({
    url: '/api/scholarship',
    method: 'get'
  })
}
