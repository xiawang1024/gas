<!--
 * @Author: xiawang1024
 * @Date: 2023-06-12 16:06:13
 * @LastEditTime: 2023-06-13 17:26:34
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/components/big/rightTop.vue
 * 工作，生活，健康
-->
<template>
  <div>
    <dv-scroll-board class="scroll-board" :config="config" />
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

export default {
  name: 'RightTop',
  data() {
    return {
      config: {
        header: [
          '温度(&#8451;)',
          '压力(kPa)',
          '瞬时流量(m&sup3;/h)',
          '累计流量(m&sup3;)',
          '脉冲(Hz)',
        ],
        data: [],
        // index: true,
        rowNum: 6,
        align: ['center'],
      },
      danger: false,
    }
  },

  mounted() {
    this.getData()

    setTimeout(() => {
      this.danger = true
      this.$refs['audio'].play()
    }, 5000)
  },
  methods: {
    getData() {
      Service.flow({}).then(res => {
        let { code, rows } = res.data
        if (code == 200) {
          let arr = []
          for (let i = 0; i < rows.length; i++) {
            let item = []
            item.push(
              rows[i].temperature,
              rows[i].pressure,
              rows[i].flowInstant,
              rows[i].flowTotal,
              rows[i].pulse
            )
            arr.push(item)
          }
          this.config.data = arr

          this.config = { ...this.config }
        }
      })
    },
    clearDanger() {
      this.$refs['audio'].stop()
    },
    playAudio() {
      this.$refs['audio'].play()
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
