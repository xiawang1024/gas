/*
 * @Author: xiawang1024
 * @Date: 2023-06-26 19:47:46
 * @LastEditTime: 2023-09-27 16:54:14
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/api/danger.js
 * 工作，生活，健康
 */
import request from './request'

export const deal = ({
  jjcdvalue,
  wtflvalue,
  address,
  locationinfoId,
  queNum,
  wtxq,
  userId,
  dealProgress,
  dealDuration,
  submitNickName,
  dubanname,
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
      jjcdvalue,
      wtflvalue,
      address,
      locationinfoId,
      queNum,
      wtxq,
      userId,
      dealProgress,
      dealDuration,
      submitNickName,
      dubanname,
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

export const get = ({
  pageNum,
  pageSize,
  wtflvalue,
  jjcdvalue,
  dealProgress,
  dubanname,
  nickName,
  beginTime,
  endTime,
}) =>
  request({
    url: `/gas/dealquestion/list`,
    method: 'get',
    params: {
      pageNum,
      pageSize,
      wtflvalue,
      jjcdvalue,
      dealProgress,
      dubanname,
      nickName,
      params: {
        beginTime,
        endTime,
      },
    },
  })
export const update = data =>
  request({ url: `/gas/dealquestion`, method: 'put', data })
