/*
 * @Author: xiawang1024
 * @Date: 2023-09-27 11:16:18
 * @LastEditTime: 2023-09-27 16:20:39
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/api/homeCheck.js
 * 工作，生活，健康
 */
import request from './request'

export const get = ({
  pageNum = 1,
  pageSize = 20,
  userId,
  gasNo,
  customerName,
  address,
  securityUser,
  executeUser,
  executeStatus,
  beginTime,
  endTime,
}) =>
  request({
    url: `/system/check/list`,
    method: 'get',
    params: {
      pageNum,
      pageSize,
      userId,
      gasNo,
      customerName,
      address,
      securityUser,
      executeUser,
      executeStatus,
      params: {
        beginTime,
        endTime,
      },
    },
  })

export const add = () => {}
export const update = () => {}
export const getDict = () => {}
export const del = () => {}
