<!--
 * @Author: xiawang1024
 * @Date: 2023-06-21 15:42:52
 * @LastEditTime: 2023-07-11 11:15:51
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/components/big/flowDigita.vue
 * 工作，生活，健康
-->
<template>
  <div class="grid-container" v-if="info.length">
    <div class="grid-item">
      <div class="icon-wrap">
        <div class="icon"></div>
        <div class="text">A温度</div>
      </div>
      <div class="digita">{{ info[0].temperature }} ℃</div>
    </div>
    <div class="grid-item">
      <div class="icon-wrap">
        <div class="icon"></div>
        <div class="text">A压力</div>
      </div>
      <div class="digita">{{ info[0].pressure }} kPa</div>
    </div>
    <div class="grid-item">
      <div class="icon-wrap">
        <div class="icon"></div>
        <div class="text">A瞬时流量</div>
      </div>
      <div class="digita">{{ info[0].flowInstant }} m³/h</div>
    </div>
    <div class="grid-item">
      <div class="icon-wrap">
        <div class="icon"></div>
        <div class="text">A累计流量</div>
      </div>
      <div class="digita">{{ info[0].flowTotal }} m³</div>
    </div>

    <div class="grid-item">
      <div class="icon-wrap">
        <div class="icon"></div>
        <div class="text">B温度</div>
      </div>
      <div class="digita">{{ info[1].temperature }} ℃</div>
    </div>
    <div class="grid-item">
      <div class="icon-wrap">
        <div class="icon"></div>
        <div class="text">B压力</div>
      </div>
      <div class="digita">{{ info[1].pressure }} kPa</div>
    </div>
    <div class="grid-item">
      <div class="icon-wrap">
        <div class="icon"></div>
        <div class="text">B瞬时流量</div>
      </div>
      <div class="digita">{{ info[1].flowInstant }} m³/h</div>
    </div>
    <div class="grid-item">
      <div class="icon-wrap">
        <div class="icon"></div>
        <div class="text">B累计流量</div>
      </div>
      <div class="digita">{{ info[1].flowTotal }} m³</div>
    </div>
  </div>
</template>

<script>
import * as FlowService from '@/api/flow'

export default {
  name: 'Flow',
  props: {
    address: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      info: [],
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
      this.address &&
        FlowService.get(this.address).then(res => {
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
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(4, 1fr);
  gap: 0px;
}

.grid-item {
  display: flex;
  align-items: center;
  justify-content: center;

  .icon-wrap {
    flex: 0 0 100px;
    .icon {
      width: 100%;
      height: 40px;
    }
    .text {
      text-align: center;
      margin-top: 5px;
      font-size: 13px;
    }
  }
  .digita {
    flex: 0 0 170px;
    font-size: 22px;
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
        height: 30px;
        background: url('./icons/ljll.png') center center no-repeat;
        background-size: contain;
      }
    }
  }

  &:nth-child(5) {
    .icon-wrap {
      .icon {
        background: url('./icons/wendu.png') center center no-repeat;
        background-size: contain;
      }
    }
  }
  &:nth-child(6) {
    .icon-wrap {
      .icon {
        background: url('./icons/yali.png') center center no-repeat;
        background-size: contain;
      }
    }
  }
  &:nth-child(7) {
    .icon-wrap {
      .icon {
        background: url('./icons/ssll.png') center center no-repeat;
        background-size: contain;
      }
    }
  }
  &:nth-child(8) {
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
