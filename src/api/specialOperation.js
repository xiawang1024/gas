/*
 * @Author: xiawang1024
 * @Date: 2023-09-27 11:16:18
 * @LastEditTime: 2023-09-27 16:26:00
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/api/specialOperation.js
 * 工作，生活，健康
 */
import request from './request'

export const get = ({
  pageNum = 1,
  pageSize = 20,
  operationType,
  operationUser,
  operationAddress,
  isOver,
  beginTime,
  endTime,
}) =>
  request({
    url: `/system/operations/list`,
    method: 'get',
    params: {
      pageNum,
      pageSize,
      operationType,
      operationUser,
      operationAddress,
      isOver,
      params: {
        beginTime,
        endTime,
      },
    },
  })
export const getDict = dictType =>
  request({ url: `/system/dict/data/type/${dictType}`, method: 'get' })
export const add = () => {}
export const update = () => {}
export const del = () => {}
