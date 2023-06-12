<!--
 * @Author: xiawang1024
 * @Date: 2023-06-12 17:49:02
 * @LastEditTime: 2023-06-12 20:45:57
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/views/work/modules/guiji.vue
 * 工作，生活，健康
-->
<template>
  <div class="container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="用户名">
        <el-select v-model="formInline.userId" placeholder="用户名">
          <el-option
            v-for="item of users"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="工种">
        <el-select v-model="formInline.workType" placeholder="工种">
          <el-option
            v-for="item of users"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="日期">
        <el-date-picker
          v-model="formInline.date"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <div class="map" id="guiji"></div>

    <div class="controls">
      <el-button @click="mockGuiji">模拟轨迹</el-button>
      <el-button @click="startAnimation">开始</el-button>
      <el-button @click="pauseAnimation">暂停</el-button>
      <el-button @click="resumeAnimation">继续</el-button>
      <el-button @click="stopAnimation">停止</el-button>
    </div>
  </div>
</template>

<script>
import * as Service from '@/api/index'
// var lineArr = [
//   [116.478935, 39.997761],
//   [116.478939, 39.997825],
//   [116.478912, 39.998549],
//   [116.478912, 39.998549],
//   [116.478998, 39.998555],
//   [116.478998, 39.998555],
//   [116.479282, 39.99856],
//   [116.479658, 39.998528],
//   [116.480151, 39.998453],
//   [116.480784, 39.998302],
//   [116.480784, 39.998302],
//   [116.481149, 39.998184],
//   [116.481573, 39.997997],
//   [116.481863, 39.997846],
//   [116.482072, 39.997718],
//   [116.482362, 39.997718],
//   [116.483633, 39.998935],
//   [116.48367, 39.998968],
//   [116.484648, 39.999861],
// ]
import AMapLoader from '@amap/amap-jsapi-loader'
export default {
  name: 'Guiji',
  data() {
    return {
      users: [],
      formInline: {
        userId: '',
        workType: '',
        date: [],
      },
    }
  },
  computed: {
    postData: function() {
      return {
        userId: this.formInline.userId,
        workType: this.formInline.workType,
        beginTime: this.formInline.date[0],
        endTime: this.formInline.date[1],
      }
    },
  },
  mounted() {
    this.initMap()
    this.getUsers()
  },
  methods: {
    getUsers() {
      Service.allUser().then(res => {
        console.log(res)
        let { code, data } = res.data
        if (code === 200) {
          this.users = data.map(item => {
            return {
              value: item.userId,
              label: item.nickName,
            }
          })
        }
      })
    },
    mockGuiji() {
      this.marker = this.createGuiji(this.map, this.AMap, lineArr)
    },
    onSubmit() {
      console.log('submit!')
      Service.guiji({ ...this.postData }).then(res => {
        let { code, rows } = res.data
        if (code === 200) {
          let lineArr = rows.map(item => {
            return [item.lon, item.lat]
          })
          this.lineArr = lineArr
          this.marker = this.createGuiji(this.map, this.AMap, lineArr)
        }
      })
    },

    createGuiji(map, AMap, lineArr) {
      this.marker && this.marker.stopMove()
      map.clearMap()
      let marker = new AMap.Marker({
        map: map,
        position: lineArr[0],
        icon: 'https://a.amap.com/jsapi_demos/static/demo-center-v2/car.png',
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

    startAnimation() {
      this.marker.moveAlong(this.lineArr, {
        // 每一段的时长
        duration: 500, //可根据实际采集时间间隔设置
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

    initMap() {
      AMapLoader.load({
        key: 'a5e96381ba664e245f7c036a6de5f7d4',
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
            center: [116.397428, 39.90923], // 初始化地图中心点位置
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
  height: calc(100vh - 280px);
  width: 100%;
}

.controls {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: #fff;
}
</style>
