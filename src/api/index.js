/*
 * @Author: xiawang1024
 * @Date: 2023-06-12 19:10:13
 * @LastEditTime: 2023-06-14 14:52:16
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/api/index.js
 * 工作，生活，健康
 */
import request from './request'

export const login = ({ username, password }) =>
  request({
    url: '/login',
    method: 'post',
    data: { username, password },
  })

// 第一行指标
export const headInfo = () =>
  request({
    url: '/gas/index/first',
    method: 'get',
  })
// map指标
export const mapAll = () => request({ url: '/gas/index/map', method: 'get' })

export const mapSingle = type =>
  request({ url: `/gas/index/map/${type}`, method: 'get' })
// 历史轨迹查询
export const guiji = ({
  pageNum,
  pageSize,
  nickName,
  workType,
  beginTime,
  endTime,
  userId,
}) =>
  request({
    url: '/gas/index/guiji/history',
    method: 'get',
    params: {
      pageNum,
      pageSize,
      nickName,
      workType,
      beginTime,
      endTime,
      userId,
    },
  })
// 手动采集查询
export const caiji = ({ userId, nickName, workType, beginTime, endTime }) =>
  request({
    url: '/gas/index/collect/manul',
    method: 'get',
    params: { userId, nickName, workType, beginTime, endTime },
  })
// 所有用户
export const allUser = () =>
  request({
    url: '/gas/index/allUser',
    method: 'get',
  })

// 流量查询
export const flow = ({ pageNum = 1, pageSize = 10000 }) =>
  request({
    url: '/gas/flowmeter/list',
    method: 'get',
    params: { pageNum, pageSize },
  })

// 客户缴费查询
export const order = ({
  payNo,
  payName,
  payCard,
  payTabNo,
  pageNum = 1,
  pageSize = 10,
}) =>
  request({
    url: '/gas/index/payment',
    method: 'get',
    params: { payNo, payName, payCard, payTabNo, pageNum, pageSize },
  })

// 传感器监控报警
export const watchAlarm = () =>
  request({
    url: '/gas/flowmeter/alarm',
    method: 'get',
  })
// 取消传感器报警
export const closeAlarm = () =>
  request({
    url: `/gas/flowmeter/alarm/disable`,
    method: 'get',
  })
