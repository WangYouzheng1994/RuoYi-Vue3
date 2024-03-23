import request from '@/utils/request'

// 查询物料维度统计分析列表
export function listStatisticsMaterialList(query) {
    return request({
        url: '/material/statistics/materialList',
        method: 'get',
        params: query
    })
}

// 查询项目维度统计分析列表
export function listStatisticsProjectMaterialList(query) {
    return request({
        url: '/material/statistics/projectMaterialList',
        method: 'get',
        params: query
    })
}
