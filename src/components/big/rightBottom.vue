<!--
 * @Author: xiawang1024
 * @Date: 2023-06-12 16:18:36
 * @LastEditTime: 2023-06-19 10:00:30
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/components/big/rightBottom.vue
 * 工作，生活，健康
-->
<template>
  <div class="container">
    <div class="select">
      <el-select v-model="value" placeholder="请选择" size="mini">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="player">
      <video ref="video" class="video" @click="hlsPlay" autoplay></video>
    </div>
  </div>
</template>

<script>
import Hls from 'hls.js'

export default {
  name: 'RightBottom',
  data() {
    return {
      options: [
        {
          value: '选项1',
          label: '直播流1',
        },
        {
          value: '选项2',
          label: '直播流2',
        },
        {
          value: '选项3',
          label: '直播流3',
        },
      ],
      value: '',
    }
  },
  mounted() {
    this.hlsPlay()
  },
  methods: {
    hlsPlay() {
      if (Hls.isSupported()) {
        let video = this.$refs.video
        let hls = new Hls()
        hls.loadSource(
          'https://cctvwbndbd.a.bdydns.com/cctvwbnd/cctv13_2/index.m3u8'
        )
        hls.attachMedia(video)
        hls.on(Hls.Events.MANIFEST_PARSED, function() {
          video.play()
        })
      }
    },
  },
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
  top: 2.5%;
  right: 2%;
}

.player {
  position: absolute;
  left: 2.5%;
  top: 3%;
  width: 95%;
  height: 94%;
  .video {
    width: 100%;
    height: 100%;
  }
}
</style>
