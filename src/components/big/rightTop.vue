<!--
 * @Author: xiawang1024
 * @Date: 2023-06-12 16:06:13
 * @LastEditTime: 2023-07-04 15:32:54
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/components/big/rightTop.vue
 * 工作，生活，健康
-->
<template>
  <div>
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
    <Flow class="scroll-board" :address="value" />
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
import Flow from '@/components/big/flowDigita.vue'

import * as ClientService from '@/api/service.js'

export default {
  name: 'RightTop',
  components: {
    Flow,
  },
  data() {
    return {
      options: [],
      value: '',
      danger: false,
    }
  },

  mounted() {
    this.timer = setInterval(() => {
      this.watchAlarm()
    }, 5000)

    this.getDict()
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    getDict() {
      let menzhanPromise = ClientService.getDict('location')
      let shebeipromise = ClientService.getDict('za_device_list')
      //并行请求
      Promise.all([menzhanPromise, shebeipromise]).then(res => {
        let menzhan = res[0].data.data
        let shebei = res[1].data.data
        let options = []
        menzhan.forEach(item => {
          options.push({
            label: item.dictLabel,
            value: item.dictValue,
          })
        })
        shebei.forEach(item => {
          options.push({
            label: item.dictLabel,
            value: item.dictValue,
          })
        })
        this.options = options
        this.value = options[0].value
      })
    },
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
::v-deep {
  .el-input--suffix .el-input__inner {
    background: transparent;
    color: #efefef;
  }
}

.select {
  position: absolute;
  z-index: 100;
  top: 4%;
  right: 2%;
}
.scroll-board {
  position: absolute;
  top: 8%;
  left: 2%;
  width: 98%;
  height: 92%;
}

.danger {
  position: absolute;
  bottom: 20%;
  right: -10px;
  width: 20%;
  height: 15%;
  background: url('./icons/jb.gif') center center no-repeat;
  background-size: contain;
}
</style>
