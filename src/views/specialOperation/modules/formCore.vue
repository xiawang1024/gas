<!--
 * @Author: xiawang1024
 * @Date: 2023-06-13 16:00:16
 * @LastEditTime: 2023-09-27 16:42:36
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/views/specialOperation/modules/formCore.vue
 * 工作，生活，健康
-->
<template>
  <div>
    <el-card class="card">
      <div class="hd-wrap">
        <el-button
          v-if="false"
          type="primary"
          class="btn"
          icon="el-icon-plus"
          @click="addHandler"
          >新增</el-button
        >
        <el-form :inline="true" :model="schForm" ref="schForm">
          <el-form-item prop="operationUser">
            <el-input
              v-model.trim="schForm.operationUser"
              placeholder="作业人"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="operationAddress">
            <el-input
              v-model.trim="schForm.operationAddress"
              placeholder="作业地点"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="operationType">
            <el-select
              v-model="schForm.operationType"
              placeholder="特种作业种类"
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
          <el-form-item prop="isOver">
            <el-select
              v-model="schForm.isOver"
              placeholder="是否结束"
              clearable
            >
              <el-option label="已结束" value="Y"></el-option>
              <el-option label="未结束" value="N"></el-option>
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
        <el-table-column prop="operationTime" label="作业时间">
        </el-table-column>
        <el-table-column prop="operationAddress" label="作业地点">
        </el-table-column>

        <el-table-column
          prop="operationContent"
          label="作业内容"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="operationDetail"
          label="作业情况"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="operationType" label="特种作业种类">
          <template slot-scope="scope">
            <el-tag type="danger">{{
              ImportantLevelMap[scope.row.operationType]
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="isOver" label="是否结束" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-tag :type="scope.row.isOver === 'Y' ? 'success' : 'danger'">{{
              scope.row.isOver === 'Y' ? '已结束' : '未结束'
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="longitude"
          label="经度"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="latitude"
          label="维度"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="altitude" label="海拔" show-overflow-tooltip>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="80">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="actionHandler(scope.row, 0)"
              size="mini"
              >查看</el-button
            >
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
      <el-descriptions border>
        <el-descriptions-item label="作业时间">
          {{ editForm.operationTime }}</el-descriptions-item
        >
        <el-descriptions-item label="作业地点">{{
          editForm.operationAddress
        }}</el-descriptions-item>
        <el-descriptions-item label="作业人">{{
          editForm.operationUser
        }}</el-descriptions-item>

        <el-descriptions-item label="特种作业种类">
          {{ ImportantLevelMap[editForm.operationType] }}
        </el-descriptions-item>
        <el-descriptions-item label="是否结束">
          <el-tag :type="editForm.isOver === 'Y' ? 'success' : 'danger'">{{
            editForm.isOver === 'Y' ? '已结束' : '未结束'
          }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="经度">{{
          editForm.longitude
        }}</el-descriptions-item>

        <el-descriptions-item label="维度">{{
          editForm.latitude
        }}</el-descriptions-item>
        <el-descriptions-item label="海拔">{{
          editForm.altitude
        }}</el-descriptions-item>
        <el-descriptions-item label="作业内容">
          {{ editForm.operationContent }}
        </el-descriptions-item>
        <el-descriptions-item label="作业情况">
          {{ editForm.operationDetail }}
        </el-descriptions-item>

        <el-descriptions-item label="作业票">
          <el-image
            style="width: 80px; height: 80px"
            :src="`${IMGHOST}${editForm.operationTicket}`"
            :preview-src-list="[`${IMGHOST}${editForm.operationTicket}`]"
          >
          </el-image>
        </el-descriptions-item>
      </el-descriptions>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as ClientService from '@/api/specialOperation.js'
const IMGHOST = process.env.VUE_APP_API_HOST

export default {
  name: 'FormCore',

  data() {
    return {
      IMGHOST,
      QuestionType: [],
      ImportantLevel: [],
      schForm: {},
      tableData: [],
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      dialogVisible: false,
      dialogType: 0, // 0 新增 1 编辑 2 查看
      editForm: {},
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
        ...this.schForm,
        pageNum: this.pageInfo.pageNum,
        pageSize: this.pageInfo.pageSize,

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
    ClientService.getDict('special_operation_type').then(res => {
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
