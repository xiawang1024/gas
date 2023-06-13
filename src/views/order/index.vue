<!--
 * @Author: xiawang1024
 * @Date: 2023-06-12 17:20:27
 * @LastEditTime: 2023-06-13 17:32:28
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/views/order/index.vue
 * 工作，生活，健康
-->
<template>
  <div class="container">
    <el-card>
      <el-page-header @back="goBack" content="缴费查询系统"> </el-page-header>
    </el-card>
    <el-card class="wrap">
      <el-form ref="form" :inline="true" :model="formInline">
        <el-form-item label="户号" prop="payNo">
          <el-input
            v-model="formInline.payNo"
            placeholder="户号"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="payName">
          <el-input
            v-model="formInline.payName"
            placeholder="姓名"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="卡号" prop="payCard">
          <el-input
            v-model="formInline.payCard"
            placeholder="卡号"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="表号" prop="payTabNo">
          <el-input
            v-model="formInline.payTabNo"
            placeholder="表号"
            clearable
          ></el-input>
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

      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="payNo" show-overflow-tooltip label="户号">
        </el-table-column>
        <el-table-column prop="payName" show-overflow-tooltip label="姓名">
        </el-table-column>
        <el-table-column prop="payAddresss" show-overflow-tooltip label="地址">
        </el-table-column>
        <el-table-column prop="payPhone" show-overflow-tooltip label="联系方式">
        </el-table-column>
        <el-table-column prop="payCard" show-overflow-tooltip label="卡号">
        </el-table-column>
        <el-table-column prop="payTabNo" show-overflow-tooltip label="表号">
        </el-table-column>
        <el-table-column prop="payType" show-overflow-tooltip label="付费类型">
        </el-table-column>
        <el-table-column
          prop="payGouqiliang"
          show-overflow-tooltip
          label="购气量"
        >
        </el-table-column>
        <el-table-column prop="payQifei" show-overflow-tooltip label="气费">
        </el-table-column>
        <el-table-column
          prop="payShishoujine"
          show-overflow-tooltip
          label="实收金额"
        >
        </el-table-column>
        <el-table-column
          prop="payZhanghujiecun"
          show-overflow-tooltip
          label="账户结存"
        >
        </el-table-column>
        <el-table-column
          prop="payShangcijieyu"
          show-overflow-tooltip
          label="上次结余"
        >
        </el-table-column>
        <el-table-column
          prop="payBencijieyu"
          show-overflow-tooltip
          label="本次结余"
        >
        </el-table-column>
        <el-table-column prop="payTime" show-overflow-tooltip label="日期">
        </el-table-column>
        <el-table-column
          prop="payOperator"
          show-overflow-tooltip
          label="操作员"
        >
        </el-table-column>
        <el-table-column
          prop="payYongqishebei"
          show-overflow-tooltip
          label="用气设备"
        >
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class="wrap">
      <div class="page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfo.pageNum"
          :page-sizes="[10, 20, 30, 50]"
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
import * as Service from '@/api/index'
export default {
  name: 'Order',
  data() {
    return {
      formInline: {
        payNo: '',
        payName: '',
        payCard: '',
        payTabNo: '',
      },
      tableData: [],
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
    }
  },
  watch: {
    'pageInfo.pageNum': {
      handler: function(val, oldVal) {
        this.getData()
      },
      immediate: true,
    },
    'pageInfo.pageSize': {
      handler: function(val, oldVal) {
        this.getData()
      },
    },
  },

  methods: {
    getData() {
      Service.order({ ...this.pageInfo, ...this.formInline }).then(res => {
        let { code, rows, total } = res.data
        if (code == 200) {
          this.tableData = rows
          this.pageInfo.total = Number(total)
        }
      })
    },
    schHandler() {
      console.log('submit!')
      this.getData()
    },
    resetHandler() {
      this.$refs['form'].resetFields()
      this.getData()
    },
    goBack() {
      this.$router.push('/')
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
  text-align: right;
}
</style>
