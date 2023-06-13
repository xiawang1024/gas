/*
 * @Author: xiawang1024
 * @Date: 2023-06-12 19:13:10
 * @LastEditTime: 2023-06-13 15:32:28
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/views/work/conf.js
 * 工作，生活，健康
 */
export const WorkType = [
  {
    label: '巡线',
    value: 'xunxian',
  },
  {
    label: '安检',
    value: 'anjian',
  },
  {
    label: '点火',
    value: 'dianhuo',
  },
  {
    label: '应急',
    value: 'yingji',
  },
  {
    label: '抄表',
    value: 'chaobiao',
  },
  {
    label: '工程',
    value: 'gongcheng',
  },
]

function map(arr) {
  let map = {}
  for (let i = 0; i < arr.length; i++) {
    map[arr[i].value] = arr[i].label
  }
  return map
}

export const WorkTypeMap = map(WorkType)
