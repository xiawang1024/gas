/*
 * @Author: xiawang1024
 * @Date: 2023-06-20 11:17:02
 * @LastEditTime: 2024-01-09 09:10:51
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/api/zhongan.js
 * 工作，生活，健康
 */
import request from './request'

export const getDept = () => request({ url: `/4g/data/c/dept`, method: 'get' })

export const get = ({ pageNum, pageSize }) =>
  request({
    url: `/4g/data/c/list`,
    method: 'get',
    params: { pageNum, pageSize },
  })

export const getLast = () =>
  request({
    url: '/4g/data/c/latest',
    method: 'get',
  })
