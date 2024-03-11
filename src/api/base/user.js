import request from '@/utils/request'

// 查询项目干系人信息列表
export function listUser(query) {
  return request({
    url: '/project/user/list',
    method: 'get',
    params: query
  })
}

// 查询项目干系人信息详细
export function getUser(id) {
  return request({
    url: '/project/user/' + id,
    method: 'get'
  })
}

// 新增项目干系人信息
export function addUser(data) {
  return request({
    url: '/project/user',
    method: 'post',
    data: data
  })
}

// 修改项目干系人信息
export function updateUser(data) {
  return request({
    url: '/project/user',
    method: 'put',
    data: data
  })
}

// 删除项目干系人信息
export function delUser(id) {
  return request({
    url: '/project/user/' + id,
    method: 'delete'
  })
}
