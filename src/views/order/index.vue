<!--
 * @Author: xiawang1024
 * @Date: 2023-06-12 17:20:27
 * @LastEditTime: 2023-06-12 17:44:54
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
      <el-form :inline="true" :model="formInline">
        <el-form-item label="户号">
          <el-input v-model="formInline.user" placeholder="户号"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="formInline.user" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="卡号">
          <el-input v-model="formInline.user" placeholder="卡号"></el-input>
        </el-form-item>
        <el-form-item label="表号">
          <el-input v-model="formInline.user" placeholder="表号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
      </el-table>
    </el-card>
    <el-card class="wrap">
      <div class="page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfo.page"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="pageInfo.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfo.total"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      formInline: {
        user: '',
        region: '',
      },
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        },
      ],
      pageInfo: {
        page: 1,
        limit: 10,
        total: 0,
      },
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
    goBack() {
      console.log('go back')
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
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
