<!--
 * @Author: xiawang1024
 * @Date: 2023-06-21 15:42:52
 * @LastEditTime: 2023-07-02 20:26:50
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /gas/src/components/big/flowDigita.vue
 * 工作，生活，健康
-->
<template>
  <div class="grid-container">
    <div class="grid-item">
      <div class="icon-wrap">
        <div class="icon"></div>
        <div class="text"></div>
      </div>
      <div class="digita">{{ info.temperature }} ℃</div>
    </div>
    <div class="grid-item">
      <div class="icon-wrap">
        <div class="icon"></div>
        <div class="text"></div>
      </div>
      <div class="digita">{{ info.pressure }} kPa</div>
    </div>
    <div class="grid-item">
      <div class="icon-wrap">
        <div class="icon"></div>
        <div class="text"></div>
      </div>
      <div class="digita">{{ info.flowInstant }} m³/h</div>
    </div>
    <div class="grid-item">
      <div class="icon-wrap">
        <div class="icon"></div>
        <div class="text"></div>
      </div>
      <div class="digita">{{ info.flowTotal }} m³</div>
    </div>

    <div class="grid-item">
      <div class="icon-wrap">
        <div class="icon"></div>
        <div class="text"></div>
      </div>
      <div class="digita">{{ info.temperature }} ℃</div>
    </div>
    <div class="grid-item">
      <div class="icon-wrap">
        <div class="icon"></div>
        <div class="text"></div>
      </div>
      <div class="digita">{{ info.pressure }} kPa</div>
    </div>
    <div class="grid-item">
      <div class="icon-wrap">
        <div class="icon"></div>
        <div class="text"></div>
      </div>
      <div class="digita">{{ info.flowInstant }} m³/h</div>
    </div>
    <div class="grid-item">
      <div class="icon-wrap">
        <div class="icon"></div>
        <div class="text"></div>
      </div>
      <div class="digita">{{ info.flowTotal }} m³</div>
    </div>
  </div>
</template>

<script>
import * as ClientService from '@/api/service.js'

import * as FlowService from '@/api/flow'

export default {
  name: 'Flow',
  props: {
    address: {
      type: String,
      default: '01',
    },
  },
  data() {
    return {
      menZhanDict: [],
      info: {},
    }
  },
  watch: {
    address() {
      this.getData()
    },
  },
  created() {
    ClientService.getDict('location').then(res => {
      let { code, data } = res.data
      if (code === 200) {
        this.menZhanDict = data.map(item => {
          return {
            label: item.dictLabel,
            value: item.dictValue,
          }
        })
      }
    })
  },
  mounted() {
    this.getData()

    this.timer = setInterval(() => {
      this.getData()
    }, 1000)
  },

  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    getData() {
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
  gap: 5px;
}

.grid-item {
  display: flex;
  align-items: center;
  justify-content: center;

  .icon-wrap {
    flex: 1;
    .icon {
      width: 100%;
      height: 50px;
    }
    .text {
      font-size: 16px;
      font-weight: bold;
    }
  }
  .digita {
    flex: 0 0 170px;
    margin-left: 10px;
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
        height: 40px;
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
        height: 40px;
        background: url('./icons/ljll.png') center center no-repeat;
        background-size: contain;
      }
    }
  }
}
</style>
