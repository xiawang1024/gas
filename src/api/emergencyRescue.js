/*
 * @Author: xiawang1024
 * @Date: 2023-09-27 15:32:03
 * @LastEditTime: 2023-09-27 16:20:06
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/api/emergencyRescue.js
 * 工作，生活，健康
 */
import request from './request'

export const get = ({
  pageNum = 1,
  pageSize = 20,
  emergencyTime,
  emergencyAddress,
  emergencyGrade,
  rescueUser,
  isOver,
  beginTime,
  endTime,
}) =>
  request({
    url: `/system/rescue/list`,
    method: 'get',
    params: {
      pageNum,
      pageSize,
      emergencyTime,
      emergencyAddress,
      emergencyGrade,
      rescueUser,
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
