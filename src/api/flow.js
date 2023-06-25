/*
 * @Author: xiawang1024
 * @Date: 2023-06-21 16:33:01
 * @LastEditTime: 2023-06-25 09:52:30
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/api/flow.js
 * 工作，生活，健康
 */
import request from './request'
//实时流量
export const get = address =>
  request({ url: `/gas/flowmeter/latest`, method: 'get', params: { address } })
// 历史流量
export const getFlowList = ({
  address,
  pageNum,
  pageSize,
  beginTime,
  endTime,
}) =>
  request({
    url: `/gas/flowmeter/list`,
    method: 'get',
    params: { address, pageNum, pageSize, beginTime, endTime },
  })
