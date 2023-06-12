/*
 * @Author: xiawang1024
 * @Date: 2023-06-12 19:10:13
 * @LastEditTime: 2023-06-12 19:17:58
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
  request({ url: `/gas/index/${type}`, method: 'get' })
