/*
 * @Author: xiawang1024
 * @Date: 2023-06-12 19:10:18
 * @LastEditTime: 2023-08-30 15:29:16
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/api/request.js
 * 工作，生活，健康
 */
import router from '@/router/index.js'
import axios from 'axios'

const request = axios.create({
  // baseURL: 'http://192.168.241.94:8089',
  // baseURL: 'http://114.115.206.239:8089',
  baseURL: 'http://123.7.68.106:8089',
  timeout: 20000,
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    if (config.method === 'get' && config.params) {
      let url = config.url + '?' + tansParams(config.params)
      url = url.slice(0, -1)
      config.params = {}
      config.url = url
    }
    // 在发送请求之前做些什么
    // console.log(config)
    // localStorage.getItem('token') 设置token
    config.headers['Authorization'] = localStorage.getItem('token')
    return config
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    // console.log(response)
    //401 token过期
    if (response.data.code === 401) {
      // 跳转到登录页面
      localStorage.removeItem('token')
      router.push('/login')
    }

    return response
  },
  error => {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default request

export function tansParams(params) {
  let result = ''
  for (const propName of Object.keys(params)) {
    const value = params[propName]
    var part = encodeURIComponent(propName) + '='
    if (value !== null && value !== '' && typeof value !== 'undefined') {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (
            value[key] !== null &&
            value[key] !== '' &&
            typeof value[key] !== 'undefined'
          ) {
            let params = propName + '[' + key + ']'
            var subPart = encodeURIComponent(params) + '='
            result += subPart + encodeURIComponent(value[key]) + '&'
          }
        }
      } else {
        result += part + encodeURIComponent(value) + '&'
      }
    }
  }
  return result
}
