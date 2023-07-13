<!--
 * @Author: xiawang1024
 * @Date: 2023-06-12 16:06:13
 * @LastEditTime: 2023-07-13 12:00:16
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

    <Flow12
      class="scroll-board"
      :address="value"
      v-if="type == 'location' && value == '001'"
    />
    <Flow
      class="scroll-board"
      :address="value"
      v-else-if="type == 'location'"
    />
    <Flow1
      class="scroll-board"
      :address="value"
      v-if="type == 'za_device_list'"
    />
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
import Flow1 from '@/components/big/flowDigita1.vue'
import Flow12 from '@/components/big/flowDigita12.vue'

import * as ClientService from '@/api/service.js'

import { Notification } from 'element-ui'

export default {
  name: 'RightTop',
  components: {
    Flow,
    Flow1,
    Flow12,
  },
  data() {
    return {
      options: [],
      value: '',
      dangerList: [],
    }
  },
  computed: {
    type() {
      let type = ''
      for (let i = 0; i < this.options.length; i++) {
        if (this.options[i].value == this.value) {
          type = this.options[i].type
          break
        }
      }

      return type
    },
    danger() {
      return this.dangerList.includes(this.value)
    },
    menzhanMap() {
      let map = {}
      for (let i = 0; i < this.options.length; i++) {
        map[this.options[i].value] = this.options[i].label
      }

      return map
    },
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
            type: item.dictType,
          })
        })
        shebei.forEach(item => {
          options.push({
            label: item.dictLabel,
            value: item.dictValue,
            type: item.dictType,
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
          if (data.length > 0) {
            this.$refs['audio'].play()
            this.dangerList = data
            this.tips(data)
          } else {
            this.$refs['audio'].pause()
          }
        }
      })
    },

    clearDanger() {
      Service.closeAlarm(this.value).then(res => {
        let { code } = res.data
        if (code == 200) {
          this.watchAlarm()
        }
      })
    },

    tips(data) {
      let str = ``

      for (let i = 0; i < data.length; i++) {
        str += `<div><el-tag type="danger">${
          this.menzhanMap[data[i]]
        }</el-tag></div>`
      }

      console.log(str)
      Notification({
        title: '警报',
        message: str,
        type: 'error',
        dangerouslyUseHTMLString: true,
        duration: 3000,
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
  bottom: 18%;
  right: -10px;
  width: 20%;
  height: 15%;
  background: url('./icons/jb.gif') center center no-repeat;
  background-size: contain;
}
</style>
