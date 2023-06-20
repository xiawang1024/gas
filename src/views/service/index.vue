<!--
 * @Author: xiawang1024
 * @Date: 2023-06-13 16:00:16
 * @LastEditTime: 2023-06-20 10:50:15
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/views/service/index.vue
 * 工作，生活，健康
-->
<template>
  <div class="container">
    <NavHeader />
    <el-card class="card">
      <div class="hd-wrap">
        <el-button
          type="primary"
          class="btn"
          icon="el-icon-plus"
          @click="addHandler"
          >新增</el-button
        >
        <el-form :inline="true" :model="schForm" ref="schForm">
          <el-form-item label="紧急程度" prop="user">
            <el-select v-model="schForm.user" placeholder="活动区域" clearable>
              <el-option
                :label="item.label"
                :value="item.value"
                v-for="item of ImportantLevel"
                :key="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="问题分类" prop="region">
            <el-select
              v-model="schForm.region"
              placeholder="活动区域"
              clearable
            >
              <el-option
                :label="item.label"
                :value="item.value"
                v-for="item of QuestionType"
                :key="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="schHandler" icon="el-icon-search"
              >查询</el-button
            >
            <el-button icon="el-icon-refresh" @click="resetHandler"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="日期"> </el-table-column>
        <el-table-column prop="name" label="中文位置"> </el-table-column>
        <el-table-column prop="name" label="问题分类"> </el-table-column>
        <el-table-column prop="name" label="问题详情"> </el-table-column>
        <el-table-column prop="name" label="紧急程度"> </el-table-column>
        <el-table-column prop="address" label="发现人"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="220">
          <template slot-scope="scope">
            <el-button @click="actionHandler(scope.row, 0)" size="mini"
              >查看</el-button
            >
            <el-button
              type="primary"
              size="mini"
              @click="actionHandler(scope.row, 1)"
              >编辑</el-button
            >
            <el-popconfirm
              icon="el-icon-info"
              icon-color="red"
              title="确定删除吗？"
              style="margin-left: 12px;"
              @confirm="actionHandler(scope.row, 2)"
            >
              <el-button slot="reference" type="danger" size="mini"
                >删除</el-button
              >
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
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

    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="800px">
      <el-form :inline="true" :model="schForm" label-width="100px">
        <el-form-item label="时间">
          <el-date-picker
            class="fixWidth"
            v-model="schForm.user"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="紧急程度" prop="user">
          <el-select
            v-model="schForm.user"
            placeholder="活动区域"
            clearable
            class="fixWidth"
          >
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="item of ImportantLevel"
              :key="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="问题分类" prop="region">
          <el-select
            v-model="schForm.region"
            placeholder="活动区域"
            clearable
            class="fixWidth"
          >
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="item of QuestionType"
              :key="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户名称">
          <el-input
            class="fixWidth"
            v-model="schForm.name"
            placeholder="请输入客户名称"
          ></el-input>
        </el-form-item>

        <el-form-item label="联系方式">
          <el-input
            class="fixWidth"
            v-model="schForm.name"
            placeholder="请输入联系方式"
          ></el-input>
        </el-form-item>

        <el-form-item label="处理人">
          <el-input
            class="fixWidth"
            v-model="schForm.name"
            placeholder="请输入处理人"
          ></el-input>
        </el-form-item>
        <el-row>
          <el-form-item label="问题详情">
            <el-input
              class="fixWidth"
              type="textarea"
              rows="4"
              v-model="schForm.name"
              placeholder="请输入问题详情"
            ></el-input>
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import NavHeader from '@/components/nav/index.vue'
import { QuestionType, ImportantLevel } from '@/views/service/conf.js'

export default {
  name: 'Service',
  components: {
    NavHeader,
  },
  data() {
    return {
      schForm: {
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
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      dialogVisible: false,
      dialogType: 0, // 0 新增 1 编辑 2 查看
    }
  },
  computed: {
    QuestionType() {
      return QuestionType
    },
    ImportantLevel() {
      return ImportantLevel
    },
    dialogTitle() {
      return this.dialogType === 0
        ? '新增'
        : this.dialogType === 1
        ? '编辑'
        : '查看'
    },
  },
  methods: {
    schHandler() {
      console.log(this.schForm)
    },
    resetHandler() {
      this.$refs.schForm.resetFields()
    },
    addHandler() {
      this.dialogVisible = true
    },
    actionHandler(row, type) {
      // type 0 查看 1 编辑 2 删除
      switch (type) {
        case 0:
          this.dialogVisible = true
          this.dialogType = 2
          break
        case 1:
          this.dialogVisible = true
          this.dialogType = 1
          break
        case 2:
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
          break
        default:
          break
      }
      console.log('actionHandler')
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
.fixWidth {
  width: 200px;
}
.card {
  margin: 20px;
  box-sizing: border-box;
}
.hd-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .btn {
    margin-bottom: 22px;
  }
}

.page {
  text-align: right;
  margin-top: 20px;
}
</style>
