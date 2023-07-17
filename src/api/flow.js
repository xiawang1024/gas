/*
 * @Author: xiawang1024
 * @Date: 2023-06-21 16:33:01
 * @LastEditTime: 2023-07-17 11:00:40
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/api/flow.js
 * 工作，生活，健康
 */
import request from './request'
//实时流量
export const get = location =>
  request({
    url: `/gas/flowmeter/latest/location/${location}`,
    method: 'get',
  })
//中安实时流量
export const getZa = ({ deviceId }) =>
  request({
    url: `/gas/za/latest`,
    method: 'get',
    params: {
      deviceId,
    },
  })
// 历史流量
export const getFlowList = ({
  location,
  pageNum,
  pageSize,
  beginTime,
  endTime,
}) =>
  request({
    url: `/gas/flowmeter/list`,
    method: 'get',
    params: { location, pageNum, pageSize, beginTime, endTime },
  })

// 中安历史流量
export const getZaFlowList = ({
  deviceId,
  pageNum = 1,
  pageSize = 10000,
  beginTime,
  endTime,
}) =>
  request({
    url: `/gas/za/list`,
    method: 'get',
    params: { deviceId, beginTime, endTime, pageNum, pageSize },
  })
