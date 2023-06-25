/*
 * @Author: xiawang1024
 * @Date: 2023-06-25 09:30:27
 * @LastEditTime: 2023-06-25 09:47:38
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/views/flow/conf.js
 * 工作，生活，健康
 */
export const FLOW_LIST = [
  {
    value: '01',
    label: '送庄门站',
  },
  {
    value: '02',
    label: '麻屯门站',
  },
]

function map(arr) {
  let map = {}
  for (let i = 0; i < arr.length; i++) {
    map[arr[i].value] = arr[i].label
  }
  return map
}

export const FLOW_LIST_MAP = map(FLOW_LIST)
