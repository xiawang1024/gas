/*
 * @Author: xiawang1024
 * @Date: 2023-06-12 19:10:18
 * @LastEditTime: 2023-06-12 19:15:41
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/api/request.js
 * 工作，生活，健康
 */
import axios from 'axios'

const request = axios.create({
  baseURL: 'http://192.168.241.94:8080',
  timeout: 20000,
})

export default request
