<!--
 * @Author: xiawang1024
 * @Date: 2023-06-12 14:03:54
 * @LastEditTime: 2023-06-12 15:01:04
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/components/big/map.vue
 * 工作，生活，健康
-->
<template>
  <div class="map-wrap">
    <div class="container" id="container">
    </div>
    <div class="select">
      <el-select v-model="value2" multiple collapse-tags style="margin-left: 20px;" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'
export default {
  name: 'mapXw',
  data () {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value2: []
    }
  },
  mounted () {
    this.initMap()
  },
  methods: {
    initMap () {
      AMapLoader.load({
        key: 'a5e96381ba664e245f7c036a6de5f7d4', // 申请好的Web端开发者Key，首次调用 load 时必填
        version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [''] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap) => {
        this.map = new AMap.Map('container', { // 设置地图容器id
          viewMode: '3D', // 是否为3D地图模式
          zoom: 12, // 初始化地图级别
          mapStyle: 'amap://styles/darkblue',
          center: [112.45, 34.62] // 初始化地图中心点位置
        })

        // 创建信息窗体
        const infoWindow = new AMap.InfoWindow()
        const onMarkerClick = (e) => {
          console.log(e)
          infoWindow.open(this.map, e.target.getPosition()) // 打开信息窗体
          // e.target 就是被点击的 Marker
        }

        const icon = new AMap.Icon({
          size: new AMap.Size(50, 50),
          image: require('./icons/01.png'), // Icon的图像
          imageSize: new AMap.Size(50, 50)
        })

        const marker = new AMap.Marker({
          position: [112.45, 34.62],
          icon: icon
        })
        this.map.add(marker)
        marker.on('click', onMarkerClick) // 绑定 click 事件

        const lineArr = [
          [116.368904, 39.913423],
          [116.382122, 39.901176],
          [116.387271, 39.912501],
          [116.398258, 39.904600]
        ]
        const polyline = new AMap.Polyline({
          path: lineArr, // 设置线覆盖物路径
          strokeColor: '#3366FF', // 线颜色
          strokeWeight: 5, // 线宽
          strokeStyle: 'solid' // 线样式
        })
        this.map.add(polyline)

        this.map.setFitView()
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>

<style lang="less" scoped>
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
