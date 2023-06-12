export const WorkType = [
  {
    lable: '巡线',
    value: 'xunxian',
  },
  {
    lable: '安检',
    value: 'anjian',
  },
  {
    lable: '点火',
    value: 'dianhuo',
  },
  {
    lable: '应急',
    value: 'yingji',
  },
  {
    lable: '抄表',
    value: 'chaobiao',
  },
  {
    lable: '工程',
    value: 'gongcheng',
  },
]

function map(arr) {
  let map = {}
  for (let i = 0; i < arr.length; i++) {
    map[arr[i].value] = arr[i].lable
  }
  return map
}

export const WorkTypeMap = map(WorkType)
