import request from '@/utils/request'

// 查询物料基础信息列表
export function listMaterial(query) {
  return request({
    url: '/base/material/list',
    method: 'get',
    params: query
  })
}

// 查询物料基础信息详细
export function getMaterial(id) {
  return request({
    url: '/base/material/' + id,
    method: 'get'
  })
}

// 新增物料基础信息
export function addMaterial(data) {
  return request({
    url: '/base/material',
    method: 'post',
    data: data
  })
}

// 修改物料基础信息
export function updateMaterial(data) {
  return request({
    url: '/base/material',
    method: 'put',
    data: data
  })
}

// 删除物料基础信息
export function delMaterial(id) {
  return request({
    url: '/base/material/' + id,
    method: 'delete'
  })
}
