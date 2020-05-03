import request from '@/utils/request'

export function upload(id, data) {
  return request({
    url: '/api/student/' + id,
    method: 'post',
    timeout: 999999999999,
    data
  })
}
export function student() {
  return request({
    url: '/api/student',
    method: 'get'
  })
}
export function gradeInfo(year) {
  return request({
    url: '/api/grade/student/' + year,
    method: 'get'
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
