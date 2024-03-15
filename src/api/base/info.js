import request from '@/utils/request'

// 查询项目基础信息列表
export function listProjectInfo(query) {
  return request({
    url: '/project/info/list',
    method: 'get',
    params: query
  })
}

// 查询项目基础信息详细
export function getProjectInfo(id) {
  return request({
    url: '/project/info/' + id,
    method: 'get'
  })
}

// 新增项目基础信息
export function addProjectInfo(data) {
  return request({
    url: '/project/info',
    method: 'post',
    data: data
  })
}

// 修改项目基础信息
export function updateProjectInfo(data) {
  return request({
    url: '/project/info',
    method: 'put',
    data: data
  })
}

// 删除项目基础信息
export function delProjectInfo(id) {
  return request({
    url: '/project/info/' + id,
    method: 'delete'
  })
}
