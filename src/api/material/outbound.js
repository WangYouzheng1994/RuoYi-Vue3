import request from '@/utils/request'

// 查询入库明细列表
export function listOutboundDetail(query) {
  return request({
    url: '/material/outbound/detail/list',
    method: 'get',
    params: query
  })
}

// 查询入库明细详细
export function getOutboundDetail(id) {
  return request({
    url: '/material/outbound/detail/' + id,
    method: 'get'
  })
}

// 新增入库明细
export function addOutboundDetail(data) {
  return request({
    url: '/material/outbound/detail',
    method: 'post',
    data: data
  })
}

// 修改入库明细
export function updateOutboundDetail(data) {
  return request({
    url: '/material/outbound/detail',
    method: 'put',
    data: data
  })
}

// 删除入库明细
export function delOutboundDetail(id) {
  return request({
    url: '/material/outbound/detail/' + id,
    method: 'delete'
  })
}
