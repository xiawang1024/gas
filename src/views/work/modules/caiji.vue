<!--
 * @Author: xiawang1024
 * @Date: 2023-06-12 17:49:02
 * @LastEditTime: 2023-06-12 18:47:05
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/views/work/modules/caiji.vue
 * 工作，生活，健康
-->
<template>
  <div class="container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="用户名">
        <el-input v-model="formInline.user" placeholder="用户名"></el-input>
      </el-form-item>

      <el-form-item label="工种">
        <el-select v-model="formInline.region" placeholder="工种">
          <el-option label="工种一" value="shanghai"></el-option>
          <el-option label="工种二" value="beijing"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="日期">
        <el-date-picker
          v-model="formInline.date"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="用户名"> </el-table-column>
      <el-table-column prop="name" label="工种"> </el-table-column>
      <el-table-column prop="address" label="日期"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="primary" size="small"
            >查看</el-button
          >
        </template>
      </el-table-column>
    </el-table>
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
  </div>
</template>

<script>
export default {
  name: 'Guiji',
  data() {
    return {
      formInline: {
        user: '',
        region: '',
      },
      pageInfo: {
        page: 1,
        limit: 10,
        total: 0,
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
    }
  },
  mounted() {},
  methods: {
    onSubmit() {
      console.log('submit!')
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
#guiji {
  height: calc(100vh - 280px);
  width: 100%;
}
.page {
  margin-top: 30px;
  text-align: right;
}
</style>
