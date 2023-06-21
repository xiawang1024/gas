/*
 * @Author: xiawang1024
 * @Date: 2023-06-21 16:33:01
 * @LastEditTime: 2023-06-21 16:33:56
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/api/flow.js
 * 工作，生活，健康
 */
import request from './request'

export const get = address =>
  request({ url: `/gas/flowmeter/latest`, method: 'get', params: { address } })
