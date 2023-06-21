<!--
 * @Author: xiawang1024
 * @Date: 2023-06-21 15:42:52
 * @LastEditTime: 2023-06-21 17:41:36
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/components/big/flow.vue
 * 工作，生活，健康
-->
<template>
  <div class="grid-container">
    <div class="grid-item" ref="chart"></div>
    <div class="grid-item" ref="chart"></div>
    <div class="grid-item" ref="chart"></div>
    <div class="grid-item" ref="chart"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import * as FlowService from '@/api/flow'

const LEN = 7
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
      chart: [],
      options: [
        {
          title: {
            //单位摄氏度
            text: '温度 ℃',
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              animation: false,
            },
          },
          xAxis: {
            type: 'time',
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
          grid: {
            bottom: 40,
            right: 16,
          },
        },
        {
          title: {
            text: '压力 kPa',
          },
          tooltip: {
            trigger: 'axis',
          },
          xAxis: {
            type: 'time',
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
          color: '#73c0de',
          backgroundColor: 'rgba(0,0,0,0)',
          grid: {
            bottom: 40,
            right: 16,
          },
        },
        {
          title: {
            text: '瞬时流量 m³/h',
          },
          tooltip: {
            trigger: 'axis',
          },
          xAxis: {
            type: 'time',
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
          color: '#91cc75',
          backgroundColor: 'rgba(0,0,0,0)',
          grid: {
            bottom: 40,
            right: 16,
          },
        },
        {
          title: {
            text: '累计流量 m³',
          },
          tooltip: {
            trigger: 'axis',
          },
          xAxis: {
            type: 'time',
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
          color: '#fac858',
          backgroundColor: 'rgba(0,0,0,0)',
          grid: {
            left: 80,
            bottom: 40,
            right: 16,
          },
        },
      ],
    }
  },
  watch: {
    address() {
      this.options[0].series[0].data = []
      this.options[1].series[0].data = []
      this.options[2].series[0].data = []
      this.options[3].series[0].data = []

      this.chart[0].setOption(this.options[0])
      this.chart[1].setOption(this.options[1])
      this.chart[2].setOption(this.options[2])
      this.chart[3].setOption(this.options[3])
    },
  },
  mounted() {
    this.initChart()

    this.getData()

    this.timer = setInterval(() => {
      this.getData()
    }, 1000)
  },

  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    initChart() {
      let charts = document.querySelectorAll('.grid-item')

      for (let i = 0; i < charts.length; i++) {
        let chart = echarts.init(charts[i], 'dark')

        chart.setOption(this.options[i])

        this.chart[i] = chart
      }
    },
    getData() {
      FlowService.get(this.address).then(res => {
        let { code, data } = res.data
        if (code == 200) {
          let time = new Date().getTime()

          this.options[0].series[0].data.push({
            name: time,
            value: [time, data.temperature],
          })

          if (this.options[0].series[0].data.length > LEN) {
            this.options[0].series[0].data.shift()
          }

          this.chart[0].setOption(this.options[0])

          this.options[1].series[0].data.push({
            name: time,
            value: [time, data.pressure],
          })

          if (this.options[1].series[0].data.length > LEN) {
            this.options[1].series[0].data.shift()
          }

          this.chart[1].setOption(this.options[1])

          this.options[2].series[0].data.push({
            name: time,
            value: [time, data.flowInstant],
          })

          if (this.options[2].series[0].data.length > LEN) {
            this.options[2].series[0].data.shift()
          }

          this.chart[2].setOption(this.options[2])

          this.options[3].series[0].data.push({
            name: time,
            value: [time, data.flowTotal],
          })

          if (this.options[3].series[0].data.length > LEN) {
            this.options[3].series[0].data.shift()
          }

          this.chart[3].setOption(this.options[3])
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
  grid-template-rows: 1fr 1fr;
  gap: 5px;
}
</style>
