<!--
 * @Author: xiawang1024
 * @Date: 2023-06-12 16:06:13
 * @LastEditTime: 2023-06-21 17:31:17
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/components/big/rightTop.vue
 * 工作，生活，健康
-->
<template>
  <div>
    <Flow class="scroll-board" />
    <div class="danger" v-if="danger" @click="clearDanger"></div>
    <audio
      src="./icons/jb.mp3"
      loop
      ref="audio"
      style="display: none;width: 0;height: 0;"
    ></audio>
  </div>
</template>

<script>
import * as Service from '@/api/index'
import Flow from '@/components/big/flow.vue'

export default {
  name: 'RightTop',
  components: {
    Flow,
  },
  data() {
    return {
      danger: false,
    }
  },

  mounted() {
    this.timer = setInterval(() => {
      this.watchAlarm()
    }, 5000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    watchAlarm() {
      Service.watchAlarm().then(res => {
        let { code, data } = res.data
        if (code == 200) {
          if (data.isAlarm == -1) {
            this.danger = true
            this.$refs['audio'].play()
          } else {
            this.danger = false
            this.$refs['audio'].pause()
          }
        }
      })
    },

    clearDanger() {
      Service.closeAlarm().then(res => {
        let { code } = res.data
        if (code == 200) {
          this.danger = false
          this.$refs['audio'].pause()
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.scroll-board {
  position: absolute;
  top: 5.5%;
  left: 2%;
  width: 96%;
  height: 90%;
}

.danger {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 20%;
  height: 15%;
  background: url('./icons/jb.gif') center center no-repeat;
  background-size: contain;
}
</style>
