<!--
 * @Author: xiawang1024
 * @Date: 2023-06-25 09:24:12
 * @LastEditTime: 2023-07-17 11:05:02
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/views/flow/index.vue
 * 工作，生活，健康
-->
<template>
  <div class="container">
    <NavHeader />
    <el-card class="wrap">
      <el-form ref="form" :inline="true" :model="schForm">
        <el-form-item label="设备" prop="address">
          <el-select
            v-model="schForm.address"
            placeholder="请选择设备"
            clearable
          >
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="item of FLOW_LIST"
              :key="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="日期" prop="date">
          <el-date-picker
            v-model="schForm.date"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            clearable
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="schHandler" icon="el-icon-search"
            >查询</el-button
          >
          <el-button @click="resetHandler" icon="el-icon-refresh"
            >重置</el-button
          >
        </el-form-item>
      </el-form>

      <div class="chart">
        <Chart :table-data="tableData"></Chart>
      </div>

      <!-- <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="location" label="门站">
          <template slot-scope="scope">
            {{ FLOW_LIST_MAP[scope.row.location] }}
          </template>
        </el-table-column>
        <el-table-column prop="temperature" label="温度 ℃"> </el-table-column>
        <el-table-column prop="pressure" label="压力 kPa"> </el-table-column>
        <el-table-column prop="flowInstant" label="瞬时流量 m³/h">
        </el-table-column>
        <el-table-column prop="flowTotal" label="累计流量 m³">
        </el-table-column>
        <el-table-column prop="dataTime" label="采集时间"> </el-table-column>
      </el-table>

      <div class="page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfo.pageNum"
          :page-sizes="[20, 50, 100, 500]"
          :page-size="pageInfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfo.total"
        >
        </el-pagination>
      </div> -->
    </el-card>
  </div>
</template>

<script>
import NavHeader from '@/components/nav/index.vue'
import * as FLowService from '@/api/flow.js'
import Chart from '@/views/flow/chart1.vue'

import * as ClientService from '@/api/service.js'

import dayjs from 'dayjs'

export default {
  name: 'Flow',
  components: {
    NavHeader,
    Chart,
  },
  data() {
    return {
      schForm: {
        address: '',
        date: null,
      },
      FLOW_LIST: [],
      pageInfo: {
        pageNum: 1,
        pageSize: 10000,
        total: 0,
      },
      tableData: [],
    }
  },
  computed: {
    postData() {
      return {
        deviceId: this.schForm.address,
        beginTime: this.schForm.date ? this.schForm.date[0] : null,
        endTime: this.schForm.date ? this.schForm.date[1] : null,
        pageNum: this.pageInfo.pageNum,
        pageSize: this.pageInfo.pageSize,
      }
    },
    FLOW_LIST_MAP() {
      let map = {}
      this.FLOW_LIST.forEach(item => {
        map[item.value] = item.label
      })
      return map
    },
  },
  watch: {
    'schForm.address': {
      handler() {
        this.getData()
      },
    },
    'pageInfo.pageNum': {
      handler() {
        this.getData()
      },
    },
    'pageInfo.pageSize': {
      handler() {
        this.getData()
      },
    },
  },
  mounted() {
    this.getDict()
  },
  methods: {
    getDict() {
      // let menzhanPromise = ClientService.getDict('location')
      let shebeipromise = ClientService.getDict('za_device_list')
      //并行请求
      // Promise.all([menzhanPromise, shebeipromise]).then(res => {
      Promise.all([shebeipromise]).then(res => {
        // let menzhan = res[0].data.data
        let shebei = res[0].data.data
        let options = []
        // menzhan.forEach(item => {
        //   options.push({
        //     label: item.dictLabel,
        //     value: item.dictValue,
        //   })
        // })
        shebei.forEach(item => {
          options.push({
            label: item.dictLabel,
            value: item.dictValue,
          })
        })
        this.FLOW_LIST = options

        this.schForm.address = options[0].value
        //间隔一周，结束时间为当前时间，开始时间为一周前  使用dayjs
        this.schForm.date = [
          dayjs()
            .subtract(1, 'week')
            .format('YYYY-MM-DD 00:00:00'),
          dayjs().format('YYYY-MM-DD HH:mm:ss'),
        ]
      })
    },
    getData() {
      FLowService.getZaFlowList(this.postData).then(res => {
        let { code, rows, total } = res.data
        if (code === 200) {
          this.tableData = rows
          this.pageInfo.total = total
        }
      })
    },
    schHandler() {
      console.log(this.schForm)
      this.getData()
    },
    resetHandler() {
      this.$refs.form.resetFields()
      this.schForm.date = null
      this.pageInfo.pageNum = 1
      this.getData()
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageInfo.pageSize = val
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pageInfo.pageNum = val
    },
  },
}
</script>

<style lang="less" scoped>
.wrap {
  margin: 15px auto;
  width: 98%;
  box-sizing: border-box;
}
.page {
  margin-top: 30px;
  text-align: right;
}

.chart {
  width: 100%;
  height: 400px;
}
</style>
