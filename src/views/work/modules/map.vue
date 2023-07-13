<!--
 * @Author: xiawang1024
 * @Date: 2023-06-20 15:07:02
 * @LastEditTime: 2023-07-13 17:25:39
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/views/work/modules/map.vue
 * 工作，生活，健康
-->
<template>
  <div class="map">
    <div class="map" id="guiji"></div>
    <div class="controls">
      <el-button @click="startAnimation">开始</el-button>
      <el-button @click="pauseAnimation">暂停</el-button>
      <el-button @click="resumeAnimation">继续</el-button>
      <el-button @click="stopAnimation">停止</el-button>
    </div>
  </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'

export default {
  name: 'MapGuiJi',
  props: {
    lineArr: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      map: null,
      marker: null,
    }
  },
  watch: {
    lineArr: {
      handler: function(val, oldVal) {
        if (val.length && this.map) {
          this.marker = this.createGuiji(this.map, this.AMap, val)
        }
      },
      immediate: true,
    },
    map: {
      handler: function(val, oldVal) {
        if (val && this.lineArr.length) {
          this.marker = this.createGuiji(val, this.AMap, this.lineArr)
        }
      },
      immediate: true,
    },
  },
  mounted() {
    this.initMap()
  },
  methods: {
    startAnimation() {
      this.marker.moveAlong(this.lineArr, {
        // 每一段的时长
        duration: 200, //可根据实际采集时间间隔设置
        // JSAPI2.0 是否延道路自动设置角度在 moveAlong 里设置
        autoRotation: true,
      })
    },
    pauseAnimation() {
      this.marker.pauseMove()
    },
    resumeAnimation() {
      this.marker.resumeMove()
    },
    stopAnimation() {
      this.marker.stopMove()
    },
    createGuiji(map, AMap, lineArr) {
      this.marker && this.marker.stopMove()
      map.clearMap()
      let size = new AMap.Size(30, 30)
      let icon = new AMap.Icon({
        size: size,
        image: require('../icons/ren.png'), // Icon的图像
        imageSize: size,
      })
      let marker = new AMap.Marker({
        map: map,
        position: lineArr[0],
        icon: icon,
        offset: new AMap.Pixel(-13, -26),
      })

      // 绘制轨迹
      let polyline = new AMap.Polyline({
        map: map,
        path: lineArr,
        showDir: true,
        strokeColor: '#28F', //线颜色
        // strokeOpacity: 1,     //线透明度
        strokeWeight: 6, //线宽
        // strokeStyle: "solid"  //线样式
      })

      let passedPolyline = new AMap.Polyline({
        map: map,
        strokeColor: '#AF5', //线颜色
        strokeWeight: 6, //线宽
      })

      marker.on('moving', e => {
        passedPolyline.setPath(e.passedPath)
        map.setCenter(e.target.getPosition(), true)
      })

      map.setFitView()

      return marker
    },
    initMap() {
      AMapLoader.load({
        key: '0cd7ff82d162927a0785f1ee25e7b7d3',
        version: '2.0',
        plugins: ['AMap.MoveAnimation'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      })
        .then(AMap => {
          this.AMap = AMap
          this.map = new AMap.Map('guiji', {
            resizeEnable: true,
            viewMode: '3D', // 是否为3D地图模式
            zoom: 12, // 初始化地图级别
            // mapStyle: 'amap://styles/darkblue',
            center: [112.45, 34.62], // 初始化地图中心点位置
          })
        })
        .catch(e => {
          console.log(e)
        })
    },
  },
}
</script>

<style lang="less" scoped>
#guiji {
  height: calc(100vh - 400px);
  width: 100%;
}

.controls {
  margin-top: 10px;
}
</style>
