/*
 * @Author: xiawang1024
 * @Date: 2023-09-27 11:16:18
 * @LastEditTime: 2023-09-27 11:17:29
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/api/homeCheck.js
 * 工作，生活，健康
 */
import request from './request'

export const get = ({ pageNum = 1, pageSize = 20 }) =>
  request({
    url: `/system/check/list`,
    method: 'get',
    params: { pageNum, pageSize },
  })
