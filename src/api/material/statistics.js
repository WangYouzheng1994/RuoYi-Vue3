import request from '@/utils/request'

// 查询入库明细列表
export function listStatisticsMaterialList(query) {
  return request({
    url: '/material/statistics/materialList',
    method: 'get',
    params: query
  })
}
