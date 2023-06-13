<!--
 * @Author: xiawang1024
 * @Date: 2023-06-12 16:06:13
 * @LastEditTime: 2023-06-13 16:37:46
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/components/big/rightTop.vue
 * 工作，生活，健康
-->
<template>
  <dv-scroll-board class="scroll-board" :config="config" />
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
    }
  },
  mounted() {
    this.getData()
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
</style>
