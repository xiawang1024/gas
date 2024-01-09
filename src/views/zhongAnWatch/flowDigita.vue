<!--
 * @Author: xiawang1024
 * @Date: 2023-06-21 15:42:52
 * @LastEditTime: 2024-01-09 10:27:11
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/views/zhongAnWatch/flowDigita.vue
 * 工作，生活，健康
-->
<template>
  <div class="grid-container" v-if="info && info.sensorDatas">
    <div class="grid-item">
      <div class="icon-wrap">
        <div class="icon"></div>
        <div class="text">A气体浓度</div>
      </div>
      <div class="digita">{{ info.sensorDatas[0].gasValue }}</div>
    </div>
    <div class="grid-item">
      <div class="icon-wrap">
        <div class="icon"></div>
        <div class="text">A气体状态</div>
      </div>
      <div class="digita">
        {{ gasStatusMap[info.sensorDatas[0].gasStatus] }}
      </div>
    </div>
    <div class="grid-item">
      <div class="icon-wrap">
        <div class="icon"></div>
        <div class="text">A气体类型</div>
      </div>
      <div class="digita">
        {{ gasTypeMap[info.sensorDatas[0].gasType].zh }} /
        {{ gasTypeMap[info.sensorDatas[0].gasType].en }}
      </div>
    </div>
    <div class="grid-item">
      <div class="icon-wrap">
        <div class="icon"></div>
        <div class="text">A气体单位</div>
      </div>
      <div class="digita">{{ gasUintMap[info.sensorDatas[0].gasUint] }}</div>
    </div>
    <div class="grid-item">
      <div class="icon-wrap">
        <div class="icon"></div>
        <div class="text">A检测精度</div>
      </div>
      <div class="digita">{{ info.sensorDatas[0].gasDec }}</div>
    </div>
    <div class="grid-item">
      <div class="icon-wrap">
        <div class="icon"></div>
        <div class="text">A一级报警值</div>
      </div>
      <div class="digita">{{ info.sensorDatas[0].alarml }}</div>
    </div>
    <div class="grid-item">
      <div class="icon-wrap">
        <div class="icon"></div>
        <div class="text">A二级报警值</div>
      </div>
      <div class="digita">{{ info.sensorDatas[0].alarmh }}</div>
    </div>
    <div class="grid-item">
      <div class="icon-wrap">
        <div class="icon"></div>
        <div class="text">A探测器量程</div>
      </div>
      <div class="digita">{{ info.sensorDatas[0].gasRange }}</div>
    </div>

    <div class="grid-item">
      <div class="icon-wrap">
        <div class="icon"></div>
        <div class="text">B气体浓度</div>
      </div>
      <div class="digita">{{ info.sensorDatas[1].gasValue }}</div>
    </div>
    <div class="grid-item">
      <div class="icon-wrap">
        <div class="icon"></div>
        <div class="text">B气体状态</div>
      </div>
      <div class="digita">
        {{ gasStatusMap[info.sensorDatas[1].gasStatus] }}
      </div>
    </div>
    <div class="grid-item">
      <div class="icon-wrap">
        <div class="icon"></div>
        <div class="text">B气体类型</div>
      </div>
      <div class="digita">
        {{ gasTypeMap[info.sensorDatas[1].gasType].zh }} /
        {{ gasTypeMap[info.sensorDatas[1].gasType].en }}
      </div>
    </div>
    <div class="grid-item">
      <div class="icon-wrap">
        <div class="icon"></div>
        <div class="text">B气体单位</div>
      </div>
      <div class="digita">{{ gasUintMap[info.sensorDatas[1].gasUint] }}</div>
    </div>
    <div class="grid-item">
      <div class="icon-wrap">
        <div class="icon"></div>
        <div class="text">B检测精度</div>
      </div>
      <div class="digita">{{ info.sensorDatas[0].gasDec }}</div>
    </div>
    <div class="grid-item">
      <div class="icon-wrap">
        <div class="icon"></div>
        <div class="text">B一级报警值</div>
      </div>
      <div class="digita">{{ info.sensorDatas[1].alarml }}</div>
    </div>
    <div class="grid-item">
      <div class="icon-wrap">
        <div class="icon"></div>
        <div class="text">B二级报警值</div>
      </div>
      <div class="digita">{{ info.sensorDatas[1].alarmh }}</div>
    </div>
    <div class="grid-item">
      <div class="icon-wrap">
        <div class="icon"></div>
        <div class="text">B探测器量程</div>
      </div>
      <div class="digita">{{ info.sensorDatas[1].gasRange }}</div>
    </div>
  </div>
</template>

<script>
import { GASTYPES, GASSTATUS, GASUINT } from '@/views/zhongAnWatch/config.js'
export default {
  name: 'Flow',
  props: {
    info: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  computed: {
    deptMap() {
      return this.flattenTree(this.depts)
    },
    gasTypeMap() {
      let map = {}
      GASTYPES.length &&
        GASTYPES.forEach(item => {
          map[item.gasType] = { zh: item.zh, en: item.en }
        })
      return map
    },
    gasStatusMap() {
      let map = {}
      GASSTATUS.length &&
        GASSTATUS.forEach(item => {
          map[item.key] = item.value
        })
      return map
    },
    gasUintMap() {
      let map = {}
      GASUINT.length &&
        GASUINT.forEach(item => {
          map[item.key] = item.value
        })
      return map
    },
  },
}
</script>

<style lang="less" scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 80px 0;
  height: calc(100vh - 240px);
}

.grid-item {
  display: flex;
  align-items: center;
  justify-content: center;

  .icon-wrap {
    flex: 0 0 75px;
    .icon {
      width: 100%;
      height: 50px;
    }
    .text {
      text-align: center;
      margin-top: 5px;
      font-size: 12px;
    }
  }
  .digita {
    margin-left: 10px;
    flex: 0 0 100px;
    font-size: 14px;
    font-weight: bold;
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
        background: url('./icons/yali.png') center center no-repeat;
        background-size: contain;
      }
    }
  }
  &:nth-child(6) {
    .icon-wrap {
      .icon {
        height: 40px;
        background: url('./icons/ljll.png') center center no-repeat;
        background-size: contain;
      }
    }
  }
  &:nth-child(7) {
    .icon-wrap {
      .icon {
        height: 40px;
        background: url('./icons/ljll.png') center center no-repeat;
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

  &:nth-child(9) {
    .icon-wrap {
      .icon {
        background: url('./icons/wendu.png') center center no-repeat;
        background-size: contain;
      }
    }
  }
  &:nth-child(10) {
    .icon-wrap {
      .icon {
        background: url('./icons/yali.png') center center no-repeat;
        background-size: contain;
      }
    }
  }
  &:nth-child(11) {
    .icon-wrap {
      .icon {
        background: url('./icons/ssll.png') center center no-repeat;
        background-size: contain;
      }
    }
  }
  &:nth-child(12) {
    .icon-wrap {
      .icon {
        background: url('./icons/ssll.png') center center no-repeat;
        background-size: contain;
      }
    }
  }
  &:nth-child(13) {
    .icon-wrap {
      .icon {
        background: url('./icons/yali.png') center center no-repeat;
        background-size: contain;
      }
    }
  }
  &:nth-child(14) {
    .icon-wrap {
      .icon {
        height: 40px;
        background: url('./icons/ljll.png') center center no-repeat;
        background-size: contain;
      }
    }
  }
  &:nth-child(15) {
    .icon-wrap {
      .icon {
        height: 40px;
        background: url('./icons/ljll.png') center center no-repeat;
        background-size: contain;
      }
    }
  }
  &:nth-child(16) {
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
