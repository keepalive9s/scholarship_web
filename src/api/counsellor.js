import request from '@/utils/request'

export function create(data) {
  return request({
    url: '/api/counsellor',
    method: 'post',
    data
  })
}

export function list() {
  return request({
    url: '/api/counsellor',
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: '/api/counsellor/' + id,
    method: 'delete'
  })
}

export function find(id) {
  return request({
    url: '/api/counsellor/' + id,
    method: 'get'
  })
}

export function update(data) {
  return request({
    url: '/api/counsellor',
    method: 'put',
    data
  })
}
