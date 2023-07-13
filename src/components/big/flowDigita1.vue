<!--
 * @Author: xiawang1024
 * @Date: 2023-06-21 15:42:52
 * @LastEditTime: 2023-07-13 16:53:42
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/components/big/flowDigita1.vue
 * 工作，生活，健康
-->
<template>
  <div class="grid-container" v-if="info.payload">
    <div class="grid-item" v-if="isPressure">
      <div class="icon-wrap">
        <div class="icon"></div>
        <div class="text">压力</div>
      </div>

      <div class="digita">{{ info.payload.meter_value }} MPa</div>
    </div>
    <div class="grid-item" v-else>
      <div class="icon-wrap">
        <div class="icon icon-1"></div>
        <div class="text">浓度</div>
      </div>
      <div class="digita">{{ info.payload.gas_value }} PPM</div>
    </div>
  </div>
</template>

<script>
import * as FlowService from '@/api/flow'

export default {
  name: 'Flow1',
  props: {
    address: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      info: {},
    }
  },
  computed: {
    isPressure() {
      if (this.info.deviceType == 'pressure') {
        return true
      } else {
        return false
      }
    },
  },
  watch: {
    address() {
      this.getData()
    },
  },

  mounted() {
    this.getData()

    this.timer = setInterval(() => {
      this.getData()
    }, 30000)
  },

  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    getData() {
      this.info = {}
      this.address &&
        FlowService.getZa({ deviceId: this.address }).then(res => {
          let { code, data } = res.data
          if (code == 200) {
            this.info = data
          }
        })
    },
  },
}
</script>

<style lang="less" scoped>
.grid-container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  gap: 0px;
}

.grid-item {
  width: 90%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;

  .icon-wrap {
    flex: 0 0 180px;
    .icon {
      width: 100%;
      height: 100px;
    }
    .text {
      text-align: center;
      margin-top: 5px;
      font-size: 16px;
    }
  }
  .digita {
    flex: 0 0 300px;
    font-size: 46px;
  }
  &:nth-child(1) {
    .icon-wrap {
      .icon {
        background: url('./icons/yali.png') center center no-repeat;
        background-size: contain;
      }
      .icon-1 {
        background: url('./icons/nongdu.png') center center no-repeat;
        background-size: contain;
      }
    }
  }
}
</style>
