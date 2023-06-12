<!--
 * @Author: xiawang1024
 * @Date: 2023-06-12 14:03:54
 * @LastEditTime: 2023-06-12 20:12:33
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/components/big/map.vue
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

import AMapLoader from '@amap/amap-jsapi-loader'

const mockData = [
  {
    log: '112.4260965',
    lat: '34.83202143',
  },
  {
    log: '112.422006',
    lat: '34.83293772',
  },
  {
    log: '112.409338',
    lat: '34.8396694',
  },
]
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
      console.log(999, types)
      for (let i = 0; i < types.length; i++) {
        if (this.markersMap[types[i]]) {
          this.map.remove(this.markersMap[types[i]])
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
        if (!this.locationMap[types[i]]) {
          this.getData(types[i])
        } else {
          this.map.add(this.markersMap[types[i]])
        }
      }
    },
    getData(type) {
      if (type == 'guanwang') {
        return false
      }
      Service.mapSingle(type).then(res => {
        let { code, data } = res.data
        if (code == 200) {
          this.locationMap[type] = data

          this.markersMap[type] = this.createMarkers(this.AMap, data, e => {
            // console.log(e)
          })

          this.map.add(this.markersMap[type])
          this.map.setFitView()
        }
      })
    },
    createInfoWindow(title, content) {},
    createMarkers(AMap, list, onMarkerClick) {
      let markers = []
      for (let i = 0; i < list.length; i++) {
        let icon = new AMap.Icon({
          size: new AMap.Size(50, 50),
          image: require(`./icons/${list[i].mapType}.png`), // Icon的图像
          imageSize: new AMap.Size(50, 50),
        })

        let marker = new AMap.Marker({
          position: [list[i].mapLon, list[i].mapLat],
          icon: icon,
        })
        marker.content = '我是第' + (i + 1) + '个Marker'
        marker.on('click', onMarkerClick) // 绑定 click 事件
        marker.emit('click', { target: marker })
        markers.push(marker)
      }

      return markers
    },

    createLines(AMap, list) {
      let lines = []

      for (let i = 0; i < list.length; i++) {
        let polyline = new AMap.Polyline({
          path: list[i], // 设置线覆盖物路径
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
        plugins: [''], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
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
