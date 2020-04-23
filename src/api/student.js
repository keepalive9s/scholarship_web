import request from '@/utils/request'

export function upload(id, data) {
  return request({
    url: '/api/student/' + id,
    method: 'post',
    timeout: 999999999999,
    data
  })
}

export function del(id) {
  return request({
    url: '/api/student/' + id,
    method: 'delete'
  })
}

export function listByYearUnitId(unitId, params) {
  return request({
    url: '/api/student/' + unitId,
    method: 'get',
    params
  })
}
