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

export function find(id) {
  return request({
    url: '/api/scholarship/' + id,
    method: 'get'
  })
}

export function listAll() {
  return request({
    url: '/api/scholarship/all',
    method: 'get'
  })
}

export function listCurrentAll() {
  return request({
    url: '/api/scholarship/year',
    method: 'get'
  })
}
