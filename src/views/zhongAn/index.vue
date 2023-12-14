<!--
 * @Author: xiawang1024
 * @Date: 2023-12-14 09:43:21
 * @LastEditTime: 2023-12-14 11:09:59
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/views/zhongAn/index.vue
 * 工作，生活，健康
-->
<template>
  <div class="container">
    <NavHeader />
    <el-card class="card">
      <div class="hd-wrap">
        <el-form :inline="true" :model="schForm" ref="schForm">
          <el-form-item prop="deptId">
            <el-cascader
              v-model="schForm.deptId"
              :options="depts"
              :props="{
                checkStrictly: true,
                value: 'deptId',
                label: 'deptName',
              }"
              clearable
            ></el-cascader>
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
      <el-table :data="tableData" border style="width: 100%" default-expand-all>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-table :data="props.row.sensorDatas">
              <el-table-column prop="flag" label="探测器标号">
              </el-table-column>
              <el-table-column prop="gasValue" label="气体浓度">
              </el-table-column>
              <!-- <el-table-column prop="gasDec" label="检测精度">
                <template slot-scope="scope">
                  <div>
                    {{ gasStatusMap[scope.row.gasStatus] }}
                  </div>
                </template>
              </el-table-column> -->
              <el-table-column prop="gasStatus" label="气体状态">
                <template slot-scope="scope">
                  <div>
                    {{ gasStatusMap[scope.row.gasStatus] }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="gasType" label="气体类型">
                <template slot-scope="scope">
                  <div>
                    {{ gasTypeMap[scope.row.gasType].zh }} /
                    {{ gasTypeMap[scope.row.gasType].en }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="gasUint" label="气体单位">
                <template slot-scope="scope">
                  <div>
                    {{ gasUintMap[scope.row.gasUint] }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="alarml" label="一级报警值">
              </el-table-column>
              <el-table-column prop="alarmh" label="二级报警值">
              </el-table-column>

              <el-table-column
                prop="gasRange"
                label="探测器量程"
                show-overflow-tooltip
              >
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column type="index"> </el-table-column>
        <el-table-column prop="deptId" label="部门ID"> </el-table-column>
        <el-table-column prop="deptId" label="部门名称">
          <template slot-scope="scope">
            <div>{{ deptMap[scope.row.deptId] }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="时间"> </el-table-column>
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
  </div>
</template>

<script>
import NavHeader from '@/components/nav/index.vue'
import * as ZhongAnService from '@/api/zhongan.js'
import { GASTYPES, GASSTATUS, GASUINT } from './config'

export default {
  name: 'ZhongAn',
  components: {
    NavHeader,
  },
  data() {
    return {
      schForm: {
        deptId: '',
      },
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      depts: [],
      tableData: [],
    }
  },
  computed: {
    postData() {
      let data = {
        pageNum: this.pageInfo.pageNum,
        pageSize: this.pageInfo.pageSize,
        deptId: this.schForm.deptId[0] || '',
      }
      return data
    },
    deptMap() {
      return this.flattenTree(this.depts)
    },
    gasTypeMap() {
      let map = {}
      GASTYPES.length &&
        GASTYPES.forEach(item => {
          map[item.gasType] = { zh: item.zh, en: item.en }
        })
      return map
    },
    gasStatusMap() {
      let map = {}
      GASSTATUS.length &&
        GASSTATUS.forEach(item => {
          map[item.key] = item.value
        })
      return map
    },
    gasUintMap() {
      let map = {}
      GASUINT.length &&
        GASUINT.forEach(item => {
          map[item.key] = item.value
        })
      return map
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
    this.getDept()
  },
  methods: {
    schHandler() {
      this.getData()
    },
    resetHandler() {
      this.$refs.schForm.resetFields()
      this.getData()
    },
    getDept() {
      ZhongAnService.getDept().then(res => {
        this.depts = res.data
      })
    },
    getData() {
      ZhongAnService.get({
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
    flattenTree(arr) {
      let result = {}

      arr.forEach(item => {
        result[item.deptId] = item.deptName

        if (Array.isArray(item.children)) {
          const childrenResult = this.flattenTree(item.children)
          result = { ...result, ...childrenResult }
        }
      })

      return result
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
