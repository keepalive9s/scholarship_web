import request from '@/utils/request'

export function current() {
  return request({
    url: '/api/admin/current',
    method: 'get'
  })
}

export function listYears() {
  return request({
    url: '/api/admin/year',
    method: 'get'
  })
}

export function setCurrentYear(year) {
  return request({
    url: '/api/admin/year/set_current/' + year,
    method: 'put'
  })
}

export function getCurrentYear() {
  return request({
    url: '/api/admin/year/current',
    method: 'get'
  })
}

export function addYear(year) {
  return request({
    url: '/api/admin/year/add/' + year,
    method: 'post'
  })
}

export function delYear(year) {
  return request({
    url: '/api/admin/year/del/' + year,
    method: 'delete'
  })
}
