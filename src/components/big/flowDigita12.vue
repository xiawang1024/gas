<!--
 * @Author: xiawang1024
 * @Date: 2023-06-21 15:42:52
 * @LastEditTime: 2023-07-25 17:04:17
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/components/big/flowDigita12.vue
 * 工作，生活，健康
-->
<template>
  <div class="grid-container" v-if="info">
    <div class="grid-item">
      <div class="icon-wrap">
        <div class="icon"></div>
        <div class="text">A温度</div>
      </div>
      <div class="digita">{{ info['DB16.DBD294'] }} ℃</div>
    </div>
    <div class="grid-item">
      <div class="icon-wrap">
        <div class="icon"></div>
        <div class="text">A压力</div>
      </div>
      <div class="digita">{{ info['DB16.DBD290'] }} kPa</div>
    </div>
    <div class="grid-item">
      <div class="icon-wrap">
        <div class="icon"></div>
        <div class="text">A工况流量</div>
      </div>
      <div class="digita">{{ info['DB16.DBD298'] }} m³/h</div>
    </div>
    <div class="grid-item">
      <div class="icon-wrap">
        <div class="icon"></div>
        <div class="text">A标况流量</div>
      </div>
      <div class="digita">{{ info['DB16.DBD302'] }} m³</div>
    </div>
    <div class="grid-item">
      <div class="icon-wrap">
        <div class="icon"></div>
        <div class="text">A工况总量</div>
      </div>
      <div class="digita">{{ info['DB16.DBD282'] }} m³</div>
    </div>
    <div class="grid-item">
      <div class="icon-wrap">
        <div class="icon"></div>
        <div class="text">A标况总量</div>
      </div>
      <div class="digita">{{ info['DB16.DBD286'] }} m³</div>
    </div>

    <div class="grid-item">
      <div class="icon-wrap">
        <div class="icon"></div>
        <div class="text">B温度</div>
      </div>
      <div class="digita">{{ info['DB16.DBD318'] }} ℃</div>
    </div>
    <div class="grid-item">
      <div class="icon-wrap">
        <div class="icon"></div>
        <div class="text">B压力</div>
      </div>
      <div class="digita">{{ info['DB16.DBD314'] }} kPa</div>
    </div>
    <div class="grid-item">
      <div class="icon-wrap">
        <div class="icon"></div>
        <div class="text">B工况流量</div>
      </div>
      <div class="digita">{{ info['DB16.DBD322'] }} m³/h</div>
    </div>
    <div class="grid-item">
      <div class="icon-wrap">
        <div class="icon"></div>
        <div class="text">B标况流量</div>
      </div>
      <div class="digita">{{ info['DB16.DBD326'] }} m³</div>
    </div>
    <div class="grid-item">
      <div class="icon-wrap">
        <div class="icon"></div>
        <div class="text">B工况总量</div>
      </div>
      <div class="digita">{{ info['DB16.DBD306'] }} m³</div>
    </div>
    <div class="grid-item">
      <div class="icon-wrap">
        <div class="icon"></div>
        <div class="text">B标况总量</div>
      </div>
      <div class="digita">{{ info['DB16.DBD310'] }} m³</div>
    </div>
  </div>
</template>

<script>
import * as FlowService from '@/api/flow'

export default {
  name: 'Flow12',
  props: {
    address: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      info: null,
    }
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
    }, 3000)
  },

  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    getData() {
      FlowService.get(this.address).then(res => {
        let { code, data } = res.data
        if (code == 200) {
          this.info = JSON.parse(data.originalData)
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 0px;
}

.grid-item {
  display: flex;
  align-items: center;
  justify-content: center;

  .icon-wrap {
    flex: 0 0 75px;
    .icon {
      width: 100%;
      height: 40px;
    }
    .text {
      text-align: center;
      margin-top: 5px;
      font-size: 12px;
    }
  }
  .digita {
    flex: 0 0 170px;
    font-size: 18px;
  }
  &:nth-child(1) {
    .icon-wrap {
      .icon {
        background: url('./icons/wendu.png') center center no-repeat;
        background-size: contain;
      }
    }
  }
  &:nth-child(2) {
    .icon-wrap {
      .icon {
        background: url('./icons/yali.png') center center no-repeat;
        background-size: contain;
      }
    }
  }
  &:nth-child(3) {
    .icon-wrap {
      .icon {
        background: url('./icons/ssll.png') center center no-repeat;
        background-size: contain;
      }
    }
  }
  &:nth-child(4) {
    .icon-wrap {
      .icon {
        background: url('./icons/ssll.png') center center no-repeat;
        background-size: contain;
      }
    }
  }
  &:nth-child(5) {
    .icon-wrap {
      .icon {
        height: 30px;
        background: url('./icons/ljll.png') center center no-repeat;
        background-size: contain;
      }
    }
  }
  &:nth-child(6) {
    .icon-wrap {
      .icon {
        height: 30px;
        background: url('./icons/ljll.png') center center no-repeat;
        background-size: contain;
      }
    }
  }

  &:nth-child(7) {
    .icon-wrap {
      .icon {
        background: url('./icons/wendu.png') center center no-repeat;
        background-size: contain;
      }
    }
  }
  &:nth-child(8) {
    .icon-wrap {
      .icon {
        background: url('./icons/yali.png') center center no-repeat;
        background-size: contain;
      }
    }
  }
  &:nth-child(9) {
    .icon-wrap {
      .icon {
        background: url('./icons/ssll.png') center center no-repeat;
        background-size: contain;
      }
    }
  }
  &:nth-child(10) {
    .icon-wrap {
      .icon {
        background: url('./icons/ssll.png') center center no-repeat;
        background-size: contain;
      }
    }
  }
  &:nth-child(11) {
    .icon-wrap {
      .icon {
        height: 30px;
        background: url('./icons/ljll.png') center center no-repeat;
        background-size: contain;
      }
    }
  }
  &:nth-child(12) {
    .icon-wrap {
      .icon {
        height: 30px;
        background: url('./icons/ljll.png') center center no-repeat;
        background-size: contain;
      }
    }
  }
}
</style>
