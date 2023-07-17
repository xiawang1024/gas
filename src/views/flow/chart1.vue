<!--
 * @Author: xiawang1024
 * @Date: 2023-06-21 15:42:52
 * @LastEditTime: 2023-07-17 11:06:41
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/views/flow/chart1.vue
 * 工作，生活，健康
-->
<template>
  <div class="grid-container">
    <div class="grid-item" ref="chart"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'Chart',
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      chart: null,
      options: {
        title: {
          //单位摄氏度
          text: '',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            animation: false,
          },
        },
        xAxis: {
          type: 'category',
          data: [],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [],
            type: 'line',
            smooth: true,
          },
        ],
        animation: false,
        color: '#ea7ccc',
        backgroundColor: 'rgba(0,0,0,0)',
      },
    }
  },

  watch: {
    tableData: {
      handler(val) {
        let lastItem = val[val.length - 1]
        if (lastItem.deviceType == 'pressure') {
          this.options.title.text = '压力 MPa'
          this.options.series[0].data = val.map(
            item => item.payload.meter_value
          )
        } else {
          this.options.title.text = '浓度 PPM'
          this.options.series[0].data = val.map(item => item.payload.gas_value)
        }

        this.options.xAxis.data = val.map(item => item.createTime)
        this.chart.setOption(this.options)
      },
      deep: true,
    },
  },

  mounted() {
    this.initChart()
  },

  methods: {
    initChart() {
      let chartDom = document.querySelector('.grid-item')

      let chart = echarts.init(chartDom)

      chart.setOption(this.options)

      this.chart = chart
    },
  },
}
</script>

<style lang="less" scoped>
.grid-container {
  height: 100%;
  display: flex;
}

.grid-item {
  flex: 1;
}
</style>
