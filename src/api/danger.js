/*
 * @Author: xiawang1024
 * @Date: 2023-06-26 19:47:46
 * @LastEditTime: 2023-06-26 22:01:51
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /gas/src/api/danger.js
 * 工作，生活，健康
 */
import request from './request'

export const deal = ({
  locationinfoId,
  queNum,
  wtxq,
  userId,
  dealProgress,
  dealDuration,
  submitNickName,
  longitude,
  latitude,
  imageWtyj,
  imageWtjj1,
  imageWtjj2,
  imageWtjj3,
  imageWtyj_Wc,
  imageWtjj1Wc,
  imageWtjj2Wc,
  imagetjj3Wc,
}) =>
  request({
    url: `/gas/dealquestion/deal`,
    method: 'post',
    data: {
      locationinfoId,
      queNum,
      wtxq,
      userId,
      dealProgress,
      dealDuration,
      submitNickName,
      longitude,
      latitude,
      imageWtyj,
      imageWtjj1,
      imageWtjj2,
      imageWtjj3,
      imageWtyj_Wc,
      imageWtjj1Wc,
      imageWtjj2Wc,
      imagetjj3Wc,
    },
  })

export const get = ({ pageNum, pageSize, wtflvalue, jjcdvalue }) =>
  request({
    url: `/gas/dealquestion/list`,
    method: 'get',
    params: {
      pageNum,
      pageSize,
      wtflvalue,
      jjcdvalue,
    },
  })
export const update = data =>
  request({ url: `/gas/dealquestion`, method: 'put', data })
