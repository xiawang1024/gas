<!--
 * @Author: xiawang1024
 * @Date: 2023-06-25 09:24:12
 * @LastEditTime: 2023-06-25 15:41:26
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
        <el-form-item label="门站" prop="address">
          <el-select
            v-model="schForm.address"
            placeholder="请选择门站"
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

      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="address" label="门站">
          <template slot-scope="scope">
            {{ FLOW_LIST_MAP[scope.row.address] }}
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
      </div>
    </el-card>
  </div>
</template>

<script>
import NavHeader from '@/components/nav/index.vue'
import { FLOW_LIST, FLOW_LIST_MAP } from '@/views/flow/conf.js'
import * as FLowService from '@/api/flow.js'
import Chart from '@/views/flow/chart.vue'
export default {
  name: 'Flow',
  components: {
    NavHeader,
    Chart,
  },
  data() {
    return {
      schForm: {
        address: FLOW_LIST[0].value,
        date: null,
      },
      FLOW_LIST,
      FLOW_LIST_MAP,
      pageInfo: {
        pageNum: 1,
        pageSize: 20,
        total: 0,
      },
      tableData: [],
    }
  },
  computed: {
    postData() {
      return {
        address: this.schForm.address,
        beginTime: this.schForm.date ? this.schForm.date[0] : null,
        endTime: this.schForm.date ? this.schForm.date[1] : null,
        pageNum: this.pageInfo.pageNum,
        pageSize: this.pageInfo.pageSize,
      }
    },
  },
  watch: {
    'pageInfo.pageNum': {
      handler() {
        this.getData()
      },
      immediate: true,
    },
    'pageInfo.pageSize': {
      handler() {
        this.getData()
      },
    },
  },
  methods: {
    getData() {
      FLowService.getFlowList(this.postData).then(res => {
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
  height: 200px;
}
</style>
