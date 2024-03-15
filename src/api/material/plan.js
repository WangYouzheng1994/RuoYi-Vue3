import request from '@/utils/request'

// 查询要货计划列表
export function listMaterialPlan(query) {
  return request({
    url: '/material/plan/list',
    method: 'get',
    params: query
  })
}

// 查询要货计划详细
export function getMaterialPlan(id) {
  return request({
    url: '/material/plan/' + id,
    method: 'get'
  })
}

// 新增要货计划
export function addMaterialPlan(data) {
  return request({
    url: '/material/plan/',
    method: 'post',
    data: data
  })
}

// 修改要货计划
export function updateMaterialPlan(data) {
  return request({
    url: '/material/plan/',
    method: 'put',
    data: data
  })
}

// 删除要货计划
export function delMaterialPlan(id) {
  return request({
    url: '/material/plan/' + id,
    method: 'delete'
  })
}
