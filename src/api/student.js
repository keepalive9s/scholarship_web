import request from '@/utils/request'

export function upload(id, data) {
  return request({
    url: '/api/student/' + id,
    method: 'post',
    timeout: 999999999999,
    data
  })
}

export function current() {
  return request({
    url: '/api/student/current',
    method: 'get'
  })
}
export function student(id) {
  return request({
    url: '/api/student/info/' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: '/api/student/' + id,
    method: 'delete'
  })
}

export function listByUnit(id, params) {
  return request({
    url: '/api/student/unit/' + id,
    method: 'get',
    params
  })
}
