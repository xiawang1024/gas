/*
 * @Author: xiawang1024
 * @Date: 2023-07-04 16:22:47
 * @LastEditTime: 2023-07-13 16:49:30
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/api/guiji.js
 * 工作，生活，健康
 */
import request from './request'

export const get = ({
  workType = 'xunxian',
  pageNum = 1,
  pageSize = 100000,
  beginTime,
  endTime,
}) =>
  request({
    url: `/gas/index/guiji/history`,
    method: 'get',
    params: { workType, pageNum, pageSize, beginTime, endTime },
  })

//轨迹列表
export const getList = ({ userId, pageNum, pageSize, beginTime, endTime }) =>
  request({
    url: `/gas/index/guiji/list`,
    method: 'get',
    params: { userId, pageNum, pageSize, beginTime, endTime },
  })

//轨迹详情
export const getDetail = guijiId =>
  request({
    url: `/gas/index/guiji/history`,
    method: 'get',
    params: { guijiId, pageSize: 500000 },
  })
