import request from '@/utils/request'

// 查询项目干系人信息列表
export function listProjectUser(query) {
  return request({
    url: '/project/user/list',
    method: 'get',
    params: query
  })
}

// 查询项目干系人信息详细
export function getProjectUser(id) {
  return request({
    url: '/project/user/' + id,
    method: 'get'
  })
}

// 新增项目干系人信息
export function addProjectUser(data) {
  return request({
    url: '/project/user',
    method: 'post',
    data: data
  })
}

// 修改项目干系人信息
export function updateProjectUser(data) {
  return request({
    url: '/project/user',
    method: 'put',
    data: data
  })
}

// 删除项目干系人信息
export function delProjectUser(id) {
  return request({
    url: '/project/user/' + id,
    method: 'delete'
  })
}
