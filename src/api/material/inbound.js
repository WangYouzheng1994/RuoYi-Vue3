import request from '@/utils/request'

// 查询入库明细列表
export function listInboundDetail(query) {
  return request({
    url: '/material/inbound/detail/list',
    method: 'get',
    params: query
  })
}

// 查询入库明细详细
export function getInboundDetail(id) {
  return request({
    url: '/material/inbound/detail/' + id,
    method: 'get'
  })
}

// 新增入库明细
export function addInboundDetail(data) {
  return request({
    url: '/material/inbound/detail',
    method: 'post',
    data: data
  })
}

// 修改入库明细
export function updateInboundDetail(data) {
  return request({
    url: '/material/inbound/detail',
    method: 'put',
    data: data
  })
}

// 删除入库明细
export function delInboundDetail(id) {
  return request({
    url: '/material/inbound/detail/' + id,
    method: 'delete'
  })
}
