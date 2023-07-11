<!--
 * @Author: xiawang1024
 * @Date: 2023-07-03 19:06:14
 * @LastEditTime: 2023-07-10 15:54:08
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/views/report/modules/map.vue
 * 工作，生活，健康
-->
<template>
  <el-card class="map-wrap">
    <div slot="header" class="clearfix">
      <span>巡线管理</span>
      <div class="right">
        <el-date-picker
          v-model="date"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
        <el-button
          style="margin-left: 10px;"
          type="primary"
          icon="el-icon-search"
          @click="schHandler"
          >查询</el-button
        >
      </div>
    </div>
    <div class="map" id="map"></div>
  </el-card>
</template>

<script>
import * as Service from '@/api/index'
import * as GuiJiService from '@/api/guiji'
import AMapLoader from '@amap/amap-jsapi-loader'

const DashedLineKey = ['A001', 'A002', 'A003', 'A004']

export default {
  name: 'Map',
  data() {
    return {
      locationMap: {},
      markersMap: {},
      date: '',
    }
  },
  computed: {
    postData() {
      return {
        beginTime: `${this.date} 00:00:00`,
        endTime: `${this.date} 23:59:59`,
      }
    },
  },
  mounted() {
    this.initMap()
  },
  methods: {
    schHandler() {
      GuiJiService.get({ ...this.postData }).then(res => {
        let { code, rows } = res.data
        if (code == 200) {
          this.markersMap['xunxian'] = this.createLabelMarkers(this.AMap, rows)

          this.labelsLayer.clear()

          this.labelsLayer.add(this.markersMap['xunxian'])

          this.map.setFitView()
        }
      })
    },
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
        key: '0cd7ff82d162927a0785f1ee25e7b7d3',
        version: '2.0',
        plugins: ['AMap.Scale', 'AMap.HawkEye', 'AMap.ToolBar'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      })
        .then(AMap => {
          this.AMap = AMap
          this.map = new AMap.Map('map', {
            viewMode: '3D', // 是否为3D地图模式
            zoom: 12, // 初始化地图级别
            mapStyle: 'amap://styles/darkblue',
            center: [112.45, 34.8], // 初始化地图中心点位置
          })

          //插件
          this.map.addControl(new AMap.Scale())
          this.map.addControl(new AMap.HawkEye())
          this.map.addControl(new AMap.ToolBar())

          //海量点标记

          this.labelsLayer = new AMap.LabelsLayer({
            zooms: [3, 20],
            zIndex: 1000,
            collision: true, // 该层内标注是否避让
            allowCollision: true, // 设置 allowCollision：true，可以让标注避让用户的标注
          })

          this.map.add(this.labelsLayer)

          this.getData('guanwang')
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
          strokeColor: paths[i].key != 'A004' ? '#f99c35' : '#999999', // 线颜色
          strokeWeight: 4, // 线宽
          strokeStyle: DashedLineKey.includes(paths[i].key)
            ? 'dashed'
            : 'round', // 线样式
        })
        lines.push(polyline)
      }
      return lines
    },
    createLabelMarkers(AMap, list) {
      let labelMarkers = []
      for (let i = 0; i < list.length; i++) {
        let size = [8, 8]
        let icon = {
          type: 'image', // 图标类型，现阶段只支持 image 类型
          image: require(`./icons/xian.png`),
          size: size, // 图片尺寸
          anchor: 'center', // 图片相对 position 的锚点，默认为 bottom-center
          offset: [-4, -4], // 图标偏移量
        }

        let content = `${list[i].nickName} ${list[i].createTime}`

        let text = {
          // content: content, // 要展示的文字内容
          direction: 'bottom', // 文字方向，有 icon 时为围绕文字的方向，没有 icon 时，则为相对 position 的位置
          offset: [0, -5], // 在 direction 基础上的偏移量
          style: {
            // 文字样式
            fontSize: 12, // 字体大小
            fillColor: '#19acf9', // 字体颜色
          },
        }
        let labelMarker = new AMap.LabelMarker({
          position: [list[i].lon, list[i].lat],
          name: list[i].nickName,
          icon: icon,
          text: text,
          extData: list[i],
        })

        labelMarker.on('mouseover', e => {
          let position = e.data.data && e.data.data.position

          if (position) {
            normalMarker.setContent(
              `<div class="amap-info-window-custom" >
                <div>${e.target._opts.extData.nickName}</div>
                <div>${e.target._opts.extData.createTime}</div>
                </div>`
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
  },
}
</script>

<style lang="less" scoped>
.map-wrap {
  margin: 20px auto;
  width: 98%;
  box-sizing: border-box;
}

.clearfix {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.map {
  width: 100%;
  height: calc(100vh - 260px);
}
</style>
