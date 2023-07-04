<!--
 * @Author: xiawang1024
 * @Date: 2023-06-12 16:18:36
 * @LastEditTime: 2023-07-04 09:13:53
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/components/big/rightBottom.vue
 * 工作，生活，健康
-->
<template>
  <div class="container">
    <div class="select">
      <el-select v-model="currentLive" placeholder="请选择" size="mini">
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
import * as LiveService from '@/api/live'
import Hls from 'hls.js'

export default {
  name: 'RightBottom',
  data() {
    return {
      options: [],
      currentLive: '',
    }
  },
  watch: {
    currentLive: {
      handler(val) {
        val && this.switchLive(val)
      },
      immediate: true,
    },
  },
  mounted() {
    this.hlsPlayerInit()
    this.getData()
  },
  beforeDestroy() {
    this.hls.destroy()
  },
  methods: {
    getData() {
      LiveService.get({}).then(res => {
        let { code, rows } = res.data
        if (code === 200) {
          this.options = rows.map(item => {
            return {
              value: item.liveUrl,
              label: item.liveName,
            }
          })

          this.currentLive = this.options[0].value
        }
      })
    },
    hlsPlayerInit() {
      if (Hls.isSupported()) {
        let hls = new Hls()
        let video = this.$refs.video
        this.hls = hls
        hls.on(Hls.Events.MANIFEST_PARSED, function() {
          // 获取到manifest解析完成的信息后，开始播放视频
          video.play()
        })
      }
    },
    switchLive(src) {
      let video = this.$refs.video
      this.hls.loadSource(src)
      this.hls.attachMedia(video)
    },
    hlsPlay() {
      let video = this.$refs.video
      video.play()
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
