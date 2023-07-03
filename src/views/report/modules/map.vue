<!--
 * @Author: xiawang1024
 * @Date: 2023-07-03 19:06:14
 * @LastEditTime: 2023-07-03 19:31:44
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /gas/src/views/report/modules/map.vue
 * 工作，生活，健康
-->
<template>
  <div class="map" id="map"></div>
</template>

<script>
import * as Service from '@/api/index'
import AMapLoader from '@amap/amap-jsapi-loader'

const DashedLineKey = ['A001', 'A002', 'A003']

export default {
  name: 'Map',
  data() {
    return {
      locationMap: {},
      markersMap: {},
    }
  },
  mounted() {
    this.initMap()
    this.getData('guanwang')
  },
  methods: {
    getData(type) {
      Service.mapSingle(type).then(res => {
        let { code, data } = res.data
        if (code == 200) {
          this.locationMap[type] = data

          this.markersMap[type] = this.createLines(this.AMap, data)

          this.map.add(this.markersMap[type])

          this.map.setFitView()
        }
      })
    },
    initMap() {
      AMapLoader.load({
        key: 'a5e96381ba664e245f7c036a6de5f7d4',
        version: '2.0',
        plugins: ['AMap.Scale', 'AMap.HawkEye', 'AMap.ToolBar'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      })
        .then(AMap => {
          this.AMap = AMap
          this.map = new AMap.Map('map', {
            viewMode: '3D', // 是否为3D地图模式
            zoom: 12, // 初始化地图级别
            // mapStyle: 'amap://styles/darkblue',
            center: [112.45, 34.8], // 初始化地图中心点位置
          })

          //插件
          this.map.addControl(new AMap.Scale())
          this.map.addControl(new AMap.HawkEye())
          this.map.addControl(new AMap.ToolBar())
        })
        .catch(e => {
          console.log(e)
        })
    },
    createLines(AMap, list) {
      let paths = []

      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        let itemPath = item[Object.keys(item)[0]].map(item => {
          return [item.mapLon, item.mapLat]
        })

        paths.push({
          path: itemPath,
          key: Object.keys(item)[0],
        })
      }

      let lines = []

      for (let i = 0; i < paths.length; i++) {
        let polyline = new AMap.Polyline({
          path: paths[i].path, // 设置线覆盖物路径
          strokeColor: 'red', // 线颜色
          strokeWeight: 2, // 线宽
          strokeStyle: DashedLineKey.includes(paths[i].key)
            ? 'dashed'
            : 'round', // 线样式
        })
        lines.push(polyline)
      }
      return lines
    },
  },
}
</script>

<style lang="less" scoped>
.map {
  width: 100%;
  height: calc(100vh - 80px);
}
</style>
