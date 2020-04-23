import request from '@/utils/request'

export function tree(id) {
  return request({
    url: '/api/unit/tree/' + id,
    method: 'get'
  })
}

export function noRootTree(id) {
  return request({
    url: '/api/unit/no_root_tree/' + id,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/api/unit',
    method: 'post',
    data
  })
}

export function del(data) {
  return request({
    url: '/api/unit',
    method: 'delete',
    data
  })
}
