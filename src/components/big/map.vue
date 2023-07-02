<!--
 * @Author: xiawang1024
 * @Date: 2023-06-12 14:03:54
 * @LastEditTime: 2023-07-02 12:24:03
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /gas/src/components/big/map.vue
 * 工作，生活，健康
-->
<template>
  <div class="map-wrap">
    <div class="container" id="container"></div>
    <div class="select">
      <el-select
        v-model="value"
        multiple
        collapse-tags
        style="margin-left: 20px;"
        placeholder="请选择"
        @change="selectHandler"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
import * as Service from '@/api/index'
import { WorkTypeMap } from '@/views/work/conf.js'

import AMapLoader from '@amap/amap-jsapi-loader'

export default {
  name: 'MapXw',
  data() {
    return {
      options: [
        {
          label: '管网',
          value: 'guanwang',
        },
        {
          label: '门站',
          value: 'menzhan',
        },
        {
          label: '阀井',
          value: 'fajing',
        },
        {
          label: '调压箱',
          value: 'tiaoyaxiang',
        },
        {
          label: '外勤人员',
          value: 'user_online',
        },
      ],
      value: [],
      locationMap: {},
      markersMap: {},
    }
  },
  watch: {
    value: function(newVal, oldVal) {
      //找出oldVal 相对 newVal 少了哪些
      let types = oldVal.filter(item => !newVal.includes(item))
      for (let i = 0; i < types.length; i++) {
        if (this.markersMap[types[i]]) {
          clearInterval(this.timer)
          this.map.remove(this.markersMap[types[i]])

          this.map.setFitView()
        }
      }
    },
  },
  mounted() {
    this.initMap()
  },
  methods: {
    selectHandler(val) {
      let types = val
      for (let i = 0; i < types.length; i++) {
        let type = types[i]
        if (type == 'user_online') {
          // 定时获取最新数据
          this.timer = setInterval(() => {
            this.getData(type)
          }, 1000)
        } else if (!this.locationMap[type]) {
          this.getData(type)
        } else {
          this.map.add(this.markersMap[type])
          this.map.setFitView()
        }
      }
    },
    getData(type) {
      Service.mapSingle(type).then(res => {
        let { code, data } = res.data
        if (code == 200) {
          this.locationMap[type] = data
          if (type == 'user_online' && this.markersMap[type]) {
            console.log('user_online', type, this.markersMap[type])
            this.map.remove(this.markersMap[type])
          }

          if (type == 'guanwang') {
            this.markersMap[type] = this.createLines(this.AMap, data)
          } else {
            this.markersMap[type] = this.createMarkers(this.AMap, data)
          }

          this.map.add(this.markersMap[type])

          this.map.setFitView()
        }
      })
    },
    createInfoWindow(title, content) {},
    createMarkers(AMap, list, onMarkerClick) {
      let markers = []
      for (let i = 0; i < list.length; i++) {
        let size =
          list[i].mapType == 'guanwang'
            ? new AMap.Size(5, 5)
            : new AMap.Size(50, 50)
        let icon = new AMap.Icon({
          size: size,
          image: require(`./icons/${list[i].mapType}.png`), // Icon的图像
          imageSize: size,
        })

        let content = ''

        if (list[i].mapType == 'menzhan') {
          content = list[i].name
        } else if (list[i].mapType == 'fajing') {
          content = list[i].mapNo
        } else if (
          list[i].mapType == 'tiaoyaxiang' ||
          list[i].mapType == 'guanwang'
        ) {
          content = ''
        } else {
          content = WorkTypeMap[list[i].mapType]
        }

        let marker = new AMap.Marker({
          position: [list[i].mapLon, list[i].mapLat],
          icon: icon,
          label: {
            content: content,
            offset: [0, 0],
            direction: 'bottom',
          },
        })
        marker.content = '我是第' + (i + 1) + '个Marker'
        marker.on('click', onMarkerClick) // 绑定 click 事件
        marker.emit('click', { target: marker })
        markers.push(marker)
      }

      return markers
    },

    createLabelMarkers(AMap, list) {
      let labelMarkers = []
      for (let i = 0; i < list.length; i++) {
        let size = list[i].mapType == 'guanwang' ? [5, 5] : [50, 50]
        let icon = {
          type: 'image', // 图标类型，现阶段只支持 image 类型
          image: require(`./icons/${list[i].mapType}.png`),
          size: size, // 图片尺寸
          anchor: 'center', // 图片相对 position 的锚点，默认为 bottom-center
        }

        let content = ''

        if (list[i].mapType == 'menzhan') {
          content = list[i].name
        } else if (list[i].mapType == 'fajing') {
          content = list[i].mapNo
        } else if (
          list[i].mapType == 'tiaoyaxiang' ||
          list[i].mapType == 'guanwang'
        ) {
          content = ''
        } else {
          content = WorkTypeMap[list[i].mapType]
        }
        let text = {
          content: content, // 要展示的文字内容
          direction: 'bottom', // 文字方向，有 icon 时为围绕文字的方向，没有 icon 时，则为相对 position 的位置
          offset: [0, -5], // 在 direction 基础上的偏移量
          style: {
            // 文字样式
            fontSize: 12, // 字体大小
            fillColor: '#ffffff', // 字体颜色
          },
        }
        let labelMarker = new AMap.LabelMarker({
          position: [list[i].mapLon, list[i].mapLat],
          name: list[i].mapType,
          icon: icon,
          text: text,
        })

        labelMarker.on('mouseover', e => {
          console.log(e)
          let position = e.data.data && e.data.data.position

          if (position) {
            normalMarker.setContent(
              '<div class="amap-info-window" >' + position + '</div>'
            )
            normalMarker.setPosition(position)
            this.map.add(normalMarker)
          }
        })
        labelMarker.on('mouseout', () => {
          this.map.remove(normalMarker)
        })

        labelMarkers.push(labelMarker)
      }

      //普通点标记
      let normalMarker = new AMap.Marker({
        anchor: 'bottom-center',
        offset: [0, -30],
      })

      return labelMarkers
    },

    createLines(AMap, list) {
      // let path = []

      // for (let i = 0; i < list.length; i++) {
      //   path.push([list[i].mapLon, list[i].mapLat])
      // }

      let paths = []

      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        let itemPath = item[Object.keys(item)[0]].map(item => {
          return [item.mapLon, item.mapLat]
        })

        paths.push(itemPath)
      }

      let lines = []

      for (let i = 0; i < paths.length; i++) {
        let polyline = new AMap.Polyline({
          path: paths[i], // 设置线覆盖物路径
          strokeColor: 'red', // 线颜色
          strokeWeight: 5, // 线宽
          strokeStyle: 'round', // 线样式
        })
        lines.push(polyline)
      }
      return lines
    },
    initMap() {
      AMapLoader.load({
        key: 'a5e96381ba664e245f7c036a6de5f7d4',
        version: '2.0',
        plugins: ['AMap.Scale', 'AMap.HawkEye', 'AMap.ToolBar'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      })
        .then(AMap => {
          this.AMap = AMap
          this.map = new AMap.Map('container', {
            viewMode: '3D', // 是否为3D地图模式
            zoom: 12, // 初始化地图级别
            mapStyle: 'amap://styles/darkblue',
            center: [112.45, 34.62], // 初始化地图中心点位置
          })

          // 创建信息窗体
          const infoWindow = new AMap.InfoWindow({ isCustom: true })
          const onMarkerClick = e => {
            console.log(e)
            infoWindow.setContent(e.target.content)
            infoWindow.open(this.map, e.target.getPosition()) // 打开信息窗体
            // e.target 就是被点击的 Marker
          }

          //海量点标记

          this.labelsLayer = new AMap.LabelsLayer({
            zooms: [3, 20],
            zIndex: 1000,
            collision: true, // 该层内标注是否避让
            allowCollision: true, // 设置 allowCollision：true，可以让标注避让用户的标注
          })

          this.map.add(this.labelsLayer)

          //插件
          this.map.addControl(new AMap.Scale())
          this.map.addControl(new AMap.HawkEye())
          this.map.addControl(new AMap.ToolBar())
        })
        .catch(e => {
          console.log(e)
        })
    },
  },
}
</script>

<style lang="less" scoped>
::v-deep {
  .el-input--suffix .el-input__inner {
    background: transparent;
  }
}
.map-wrap {
  position: absolute;
  left: 1%;
  top: 1%;
  width: 98%;
  height: 98%;
  box-sizing: border-box;
}

#container {
  width: 100%;
  height: 100%;
}

.select {
  position: absolute;
  top: 1%;
  right: 1%;
}
</style>
