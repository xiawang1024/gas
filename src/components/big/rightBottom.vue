<!--
 * @Author: xiawang1024
 * @Date: 2023-06-12 16:18:36
 * @LastEditTime: 2023-06-12 16:29:27
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/components/big/rightBottom.vue
 * 工作，生活，健康
-->
<template>
  <div class="container">
    <div class="select">
      <el-select v-model="value" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="player">
      <video class="video" src="https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo-720p.mp4" controls></video>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rightBottom',
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
      value: ''
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
::v-deep {
  .el-input--suffix .el-input__inner {
    background: transparent;
    color: #efefef;
  }
}

.select {
  position: absolute;
  z-index: 100;
  top: 2%;
  right: 2%;
}

.player{
  position: absolute;
  left:2.5%;
  top:3%;
  width: 95%;
  height: 94%;
  .video{
    width: 100%;
    height: 100%;
  }
}
</style>
