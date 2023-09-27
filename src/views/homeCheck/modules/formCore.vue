<!--
 * @Author: xiawang1024
 * @Date: 2023-06-13 16:00:16
 * @LastEditTime: 2023-09-27 15:23:52
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/views/homeCheck/modules/formCore.vue
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
          <el-form-item prop="userId">
            <el-input
              v-model.trim="schForm.userId"
              placeholder="用户号"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="gasNo">
            <el-input
              v-model.trim="schForm.gasNo"
              placeholder="燃气表号"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="customerName">
            <el-input
              v-model.trim="schForm.customerName"
              placeholder="用户名称"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="address">
            <el-input
              v-model.trim="schForm.address"
              placeholder="详细地址"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="securityUser">
            <el-input
              v-model.trim="schForm.securityUser"
              placeholder="安检员"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="executeUser">
            <el-input
              v-model.trim="schForm.executeUser"
              placeholder="整改人"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="executeStatus">
            <el-select v-model="schForm.executeStatus" placeholder="是否完成">
              <el-option label="已完成" value="Y"> </el-option>
              <el-option label="未完成" value="N"> </el-option>
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
        <el-table-column prop="userId" label="用户号" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="gasNo" label="燃气表号" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="customerName"
          label="用户名称"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="address" label="详细地址" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="phoneNum" label="联系电话" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="securityUser"
          label="安检员"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="securityTime"
          label="安检日期"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="securityDetail"
          label="安检详情"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="executeUser"
          label="整改人"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="executeDetail"
          label="整改情况"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          prop="executeStatus"
          label="是否完成"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.executeStatus === 'Y' ? 'success' : 'danger'"
              >{{
                scope.row.executeStatus === 'Y' ? '未完成' : '已完成'
              }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="longitude" label="经度" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="latitude" label="维度" show-overflow-tooltip>
        </el-table-column>
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
      width="1000px"
      @closed="dialogClose"
      top="8vh"
    >
      <el-descriptions border>
        <el-descriptions-item label="用户号">
          {{ editForm.userId }}</el-descriptions-item
        >
        <el-descriptions-item label="燃气表号">{{
          editForm.gasNo
        }}</el-descriptions-item>

        <el-descriptions-item label="用户名称">
          {{ editForm.customerName }}</el-descriptions-item
        >
        <el-descriptions-item label="详细地址">
          {{ editForm.address }}
        </el-descriptions-item>
        <el-descriptions-item label="联系电话">{{
          editForm.phoneNum
        }}</el-descriptions-item>
        <el-descriptions-item label="安检员">{{
          editForm.securityUser
        }}</el-descriptions-item>
        <el-descriptions-item label="安检详情">{{
          editForm.securityDetail
        }}</el-descriptions-item>
        <el-descriptions-item label="安检日期">{{
          editForm.securityTime
        }}</el-descriptions-item>
        <el-descriptions-item label="整改人">{{
          editForm.executeUser
        }}</el-descriptions-item>
        <el-descriptions-item label="经度">{{
          editForm.longitude
        }}</el-descriptions-item>
        <el-descriptions-item label="维度">{{
          editForm.latitude
        }}</el-descriptions-item>
        <el-descriptions-item label="海拔">{{
          editForm.altitude
        }}</el-descriptions-item>
        <el-descriptions-item label="整改情况">{{
          editForm.executeDetail
        }}</el-descriptions-item>
        <el-descriptions-item label="是否完成">
          <el-tag
            :type="editForm.executeStatus === 'Y' ? 'success' : 'danger'"
            >{{ editForm.executeStatus === 'Y' ? '未完成' : '已完成' }}</el-tag
          >
        </el-descriptions-item>

        <el-descriptions-item label="安检单">
          <el-image
            style="width: 80px; height: 80px"
            :src="`${IMGHOST}${editForm.securityTable}`"
            :preview-src-list="[`${IMGHOST}${editForm.securityTable}`]"
          >
          </el-image>
        </el-descriptions-item>
        <el-descriptions-item label="安检照片">
          <el-image
            v-for="item of [1, 2, 3, 4, 5, 6]"
            :key="item"
            style="width: 80px; height: 80px;margin-right: 4px;"
            :src="`${IMGHOST}${editForm['securityImage' + item]}`"
            :preview-src-list="securityImageList"
          >
          </el-image>
        </el-descriptions-item>
        <el-descriptions-item label="隐患照片">
          <el-image
            v-for="item of [1, 2, 3]"
            :key="item"
            style="width: 80px; height: 80px;margin-right: 4px;"
            :src="`${IMGHOST}${editForm['hiddenDangerImage' + item]}`"
            :preview-src-list="hiddenDangerImageList"
          >
          </el-image>
        </el-descriptions-item>
        <el-descriptions-item label="整改照片">
          <el-image
            v-for="item of [1, 2, 3]"
            :key="item"
            style="width: 80px; height: 80px;margin-right: 4px;"
            :src="`${IMGHOST}${editForm['executeImage' + item]}`"
            :preview-src-list="executeImageList"
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
import * as ClientService from '@/api/homeCheck.js'

const IMGHOST = 'http://192.168.241.94:8089'

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
    securityImageList() {
      let list = []
      for (let i = 1; i <= 6; i++) {
        let key = `securityImage${i}`
        list.push(`${IMGHOST}${this.editForm[key]}`)
      }
      return list
    },
    hiddenDangerImageList() {
      let list = []
      for (let i = 1; i <= 3; i++) {
        let key = `hiddenDangerImage${i}`
        list.push(`${IMGHOST}${this.editForm[key]}`)
      }
      return list
    },
    executeImageList() {
      let list = []
      for (let i = 1; i <= 3; i++) {
        let key = `executeImage${i}`

        list.push(`${IMGHOST}${this.editForm[key]}`)
      }
      return list
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
  created() {},
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
        customerName: '',
        gasNo: '',
        userId: '',
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
