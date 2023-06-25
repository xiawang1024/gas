<!--
 * @Author: xiawang1024
 * @Date: 2023-06-21 15:42:52
 * @LastEditTime: 2023-06-25 10:26:26
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/views/flow/chart.vue
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
            type: 'category',
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
            type: 'category',
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
            type: 'category',
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
            type: 'category',
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
  computed: {
    data1() {
      return this.tableData.map(item => item.temperature)
    },
    data2() {
      return this.tableData.map(item => item.pressure)
    },
    data3() {
      return this.tableData.map(item => item.flowInstant)
    },
    data4() {
      return this.tableData.map(item => item.flowTotal)
    },
    xAxisData() {
      return this.tableData.map(item => item.dataTime)
    },
  },
  watch: {
    tableData() {
      this.options[0].series[0].data = this.data1.reverse()
      this.options[1].series[0].data = this.data2.reverse()
      this.options[2].series[0].data = this.data3.reverse()
      this.options[3].series[0].data = this.data4.reverse()

      let xAxisData = this.xAxisData.reverse()

      this.options[0].xAxis.data = xAxisData
      this.options[1].xAxis.data = xAxisData
      this.options[2].xAxis.data = xAxisData
      this.options[3].xAxis.data = xAxisData

      this.chart[0].setOption(this.options[0])
      this.chart[1].setOption(this.options[1])
      this.chart[2].setOption(this.options[2])
      this.chart[3].setOption(this.options[3])
    },
  },
  mounted() {
    this.initChart()
  },

  methods: {
    initChart() {
      let charts = document.querySelectorAll('.grid-item')

      for (let i = 0; i < charts.length; i++) {
        let chart = echarts.init(charts[i])

        chart.setOption(this.options[i])

        this.chart[i] = chart
      }
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
