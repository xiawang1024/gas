/*
 * @Author: xiawang1024
 * @Date: 2023-06-12 19:10:13
 * @LastEditTime: 2023-06-13 16:17:18
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/api/index.js
 * 工作，生活，健康
 */
import request from './request'
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
export const flow = ({ pageNum = 1, pageSize = 10 }) =>
  request({
    url: '/gas/flowmeter/list',
    method: 'get',
    params: { pageNum, pageSize },
  })