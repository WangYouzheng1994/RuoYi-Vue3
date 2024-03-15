import request from '@/utils/request'

// 查询要货计划明细列表
export function listMaterialPlanDetail(query) {
  return request({
    url: '/material/plan/detaillist',
    method: 'get',
    params: query
  })
}

// 查询要货计划明细详细
export function getMaterialPlanDetail(id) {
  return request({
    url: '/material/plan/detail' + id,
    method: 'get'
  })
}

// 新增要货计划明细
export function addMaterialPlanDetail(data) {
  return request({
    url: '/system/detail',
    method: 'post',
    data: data
  })
}

// 修改要货计划明细
export function updateMaterialPlanDetail(data) {
  return request({
    url: '/material/plan/detail',
    method: 'put',
    data: data
  })
}

// 删除要货计划明细
export function delMaterialPlanDetail(id) {
  return request({
    url: '/material/plan/detail' + id,
    method: 'delete'
  })
}
