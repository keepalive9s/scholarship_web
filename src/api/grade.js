import request from '@/utils/request'

export function upload(year, data) {
  return request({
    url: '/api/grade/' + year,
    method: 'post',
    timeout: 999999999999,
    data
  })
}

export function del(id, year) {
  return request({
    url: '/api/grade/' + id + '/' + year,
    method: 'delete'
  })
}

export function listByYearUnitId(unitId, params) {
  return request({
    url: '/api/grade/' + unitId,
    method: 'get',
    params
  })
}
