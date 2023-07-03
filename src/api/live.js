/*
 * @Author: xiawang1024
 * @Date: 2023-07-03 18:52:20
 * @LastEditTime: 2023-07-03 18:52:53
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /gas/src/api/live.js
 * 工作，生活，健康
 */
import request from './request'

export const get = ({ pageNum = 1, pageSize = 20 }) =>
  request({
    url: `/gas/live/list`,
    method: 'get',
    params: { pageNum, pageSize },
  })
