<!--
 * @Author: xiawang1024
 * @Date: 2023-06-13 16:00:16
 * @LastEditTime: 2023-06-25 17:13:06
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
          <el-form-item prop="clientInfo">
            <el-input
              v-model.trim="schForm.clientInfo"
              placeholder="客户信息"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="problemUrgency">
            <el-select
              v-model="schForm.problemUrgency"
              placeholder="紧急程度"
              clearable
            >
              <el-option
                :label="item.label"
                :value="item.value"
                v-for="item of ImportantLevel"
                :key="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="problemType">
            <el-select
              v-model="schForm.problemType"
              placeholder="问题分类"
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
          <el-form-item prop="date">
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
            <el-button icon="el-icon-refresh" @click="resetHandler"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="createTime" label="日期"> </el-table-column>
        <el-table-column prop="address" label="位置"> </el-table-column>
        <el-table-column prop="problemType" label="问题分类">
          <template slot-scope="scope">
            <el-tag>{{ QuestionTypeMap[scope.row.problemType] }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="problemDetails"
          label="问题详情"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="problemUrgency" label="紧急程度">
          <template slot-scope="scope">
            <el-tag type="danger">{{
              ImportantLevelMap[scope.row.problemUrgency]
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="clientInfo" label="发现人" show-overflow-tooltip>
        </el-table-column>
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

    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="800px"
      @closed="dialogClose"
    >
      <el-form :inline="true" :model="editForm" label-width="100px">
        <el-form-item label="紧急程度" prop="problemUrgency">
          <el-select
            v-model="editForm.problemUrgency"
            placeholder="紧急程度"
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
        <el-form-item label="问题分类" prop="problemType">
          <el-select
            v-model="editForm.problemType"
            placeholder="问题分类"
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
        <el-form-item label="客户信息" prop="clientInfo">
          <el-input
            class="fixWidth"
            v-model="editForm.clientInfo"
            placeholder="请输入客户名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="所在位置" prop="address">
          <el-input
            class="fixWidth"
            v-model="editForm.address"
            placeholder="请输入所在位置"
          ></el-input>
        </el-form-item>
        <el-form-item label="问题详情">
          <el-input
            class="fixWidth"
            type="textarea"
            rows="4"
            v-model="editForm.problemDetails"
            placeholder="请输入问题详情"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as ClientService from '@/api/service.js'

import NavHeader from '@/components/nav/index.vue'

export default {
  name: 'Service',
  components: {
    NavHeader,
  },
  data() {
    return {
      QuestionType: [],
      ImportantLevel: [],
      schForm: {
        problemType: '',
        problemUrgency: '',
        clientInfo: '',
        date: null,
      },
      tableData: [],
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      dialogVisible: false,
      dialogType: 0, // 0 新增 1 编辑 2 查看
      editForm: {
        problemType: '',
        problemUrgency: '',
        clientInfo: '',
        address: '',
        problemDetails: '',
      },
    }
  },
  computed: {
    QuestionTypeMap() {
      let map = {}
      this.QuestionType.length &&
        this.QuestionType.forEach(item => {
          map[item.value] = item.label
        })
      return map
    },
    ImportantLevelMap() {
      let map = {}
      this.ImportantLevel.length &&
        this.ImportantLevel.forEach(item => {
          map[item.value] = item.label
        })
      return map
    },
    dialogTitle() {
      return this.dialogType === 0
        ? '新增'
        : this.dialogType === 1
        ? '编辑'
        : '查看'
    },
    postData() {
      let data = {
        pageNum: this.pageInfo.pageNum,
        pageSize: this.pageInfo.pageSize,
        problemType: this.schForm.problemType,
        problemUrgency: this.schForm.problemUrgency,
        clientInfo: this.schForm.clientInfo,
        beginTime: this.schForm.date && this.schForm.date[0],
        endTime: this.schForm.date && this.schForm.date[1],
      }
      return data
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
  created() {
    ClientService.getDict('problem_type').then(res => {
      let { code, data } = res.data
      if (code === 200) {
        this.QuestionType = data.map(item => {
          return {
            label: item.dictLabel,
            value: item.dictValue,
          }
        })
      }
    })
    ClientService.getDict('problem_urgency').then(res => {
      let { code, data } = res.data
      if (code === 200) {
        this.ImportantLevel = data.map(item => {
          return {
            label: item.dictLabel,
            value: item.dictValue,
          }
        })
      }
    })
  },
  methods: {
    getData() {
      ClientService.get({
        ...this.postData,
      }).then(res => {
        let { code, rows, total } = res.data
        if (code == 200) {
          this.tableData = rows
          this.pageInfo.total = total
        } else {
          this.$message({
            type: 'error',
            message: '获取数据失败!',
          })
        }
      })
    },
    dialogClose() {
      this.editForm = {
        problemType: '',
        problemUrgency: '',
        clientInfo: '',
        address: '',
        problemDetails: '',
      }
    },
    schHandler() {
      this.getData()
    },
    resetHandler() {
      this.$refs.schForm.resetFields()
      this.getData()
    },
    addHandler() {
      this.dialogVisible = true
      this.dialogType = 0
    },
    actionHandler(row, type) {
      // type 0 查看 1 编辑 2 删除
      switch (type) {
        case 0:
          this.editForm = row
          this.dialogVisible = true
          this.dialogType = 2
          break
        case 1:
          this.editForm = row
          this.dialogVisible = true
          this.dialogType = 1
          break
        case 2:
          ClientService.del(row.clientId).then(res => {
            let { code } = res.data
            if (code === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!',
              })
              this.getData()
            }
          })
          break
        default:
          break
      }
      console.log('actionHandler')
    },
    dialogConfirm() {
      if (this.dialogType === 0) {
        ClientService.add({ ...this.editForm }).then(res => {
          let { code } = res.data
          if (code === 200) {
            this.$message({
              type: 'success',
              message: '新增成功!',
            })
            this.dialogVisible = false
            this.getData()
          }
        })
      } else {
        ClientService.update({ ...this.editForm }).then(res => {
          let { code } = res.data
          if (code === 200) {
            this.$message({
              type: 'success',
              message: '修改成功!',
            })
            this.dialogVisible = false
            this.getData()
          }
        })
      }
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
  width: 250px;
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
