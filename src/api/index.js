/*
 * @Author: xiawang1024
 * @Date: 2023-06-12 19:10:13
 * @LastEditTime: 2023-06-12 20:41:10
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/api/index.js
 * 工作，生活，健康
 */
import request from './request'

export const headInfo = () =>
  request({
    url: '/gas/index/first',
    method: 'get',
  })

export const mapAll = () => request({ url: '/gas/index/map', method: 'get' })

export const mapSingle = type =>
  request({ url: `/gas/index/map/${type}`, method: 'get' })

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

export const caiji = ({ nickName, workType, beginTime, endTime }) =>
  request({
    url: '/gas/index/collect/manul',
    method: 'get',
    params: { nickName, workType, beginTime, endTime },
  })

export const allUser = () =>
  request({
    url: '/gas/index/allUser',
    method: 'get',
  })
