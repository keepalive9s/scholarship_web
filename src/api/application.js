import request from '@/utils/request'

export function create(scholarshipId) {
  return request({
    url: '/api/application/apply/' + scholarshipId,
    method: 'get'
  })
}
export function publicity() {
  return request({
    url: '/api/application/publicity',
    method: 'get'
  })
}
