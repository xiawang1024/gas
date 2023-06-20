import request from './request'

//客户服务字典值获取
// client_problem_type 问题分类
// client_problem_urgency 紧急程度
export const getDict = dictType =>
  request({ url: `/system/dict/data/type/${dictType}`, method: 'get' })
// 客户服务查询
export const get = ({
  pageNum,
  pageSize,
  problemType,
  problemUrgency,
  clientInfo,
}) =>
  request({
    url: `/gas/client/service/list`,
    method: 'get',
    params: { pageNum, pageSize, problemType, problemUrgency, clientInfo },
  })

// 客户服务新增
export const add = ({
  problemType,
  problemUrgency,
  address,
  problemDetails,
  clientInfo,
}) =>
  request({
    url: `/gas/client/service`,
    method: 'post',
    data: { problemType, problemUrgency, address, problemDetails, clientInfo },
  })

// 客户服务修改
export const update = ({
  clientId,
  problemType,
  problemUrgency,
  address,
  problemDetails,
  clientInfo,
}) =>
  request({
    url: `/gas/client/service`,
    method: 'put',
    data: {
      clientId,
      problemType,
      problemUrgency,
      address,
      problemDetails,
      clientInfo,
    },
  })

// 客户服务删除
export const del = clientId =>
  request({
    url: `/gas/client/service/${clientId}`,
    method: 'delete',
  })
