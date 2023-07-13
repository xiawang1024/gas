<!--
 * @Author: xiawang1024
 * @Date: 2023-06-12 17:49:02
 * @LastEditTime: 2023-07-13 17:28:11
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/views/work/modules/guiji.vue
 * 工作，生活，健康
-->
<template>
  <div class="container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="用户名">
        <el-select clearable v-model="formInline.userId" placeholder="用户名">
          <el-option
            v-for="item of users"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="工种" v-if="false">
        <el-select clearable v-model="formInline.workType" placeholder="工种">
          <el-option
            v-for="item of WorkType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="日期">
        <el-date-picker
          v-model="formInline.date"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          placeholder="选择日期"
          value-format="yyyy-MM-dd HH:mm:ss"
          clearable
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="schHandler">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="guijiId" label="轨迹ID" width="180">
      </el-table-column>
      <el-table-column prop="userId" label="用户ID" width="180">
      </el-table-column>
      <el-table-column prop="nickName" label="姓名"> </el-table-column>
      <el-table-column prop="workType" label="工种">
        <template slot-scope="scope">
          {{ WorkTypeMap[scope.row.workType] }}
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="时间"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="openMapHandler(scope.row)"
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

    <el-dialog title="轨迹回放" :visible.sync="mapVisible" top="5vh">
      <MapXw :line-arr="lineArr"></MapXw>
      <span slot="footer" class="dialog-footer">
        <el-button @click="mapVisible = false">取 消</el-button>
        <el-button type="primary" @click="mapVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as Service from '@/api/index'
import * as GuiJiService from '@/api/guiji'
import { WorkType, WorkTypeMap } from '../conf.js'

import MapXw from './map.vue'

export default {
  name: 'Guiji',
  components: {
    MapXw,
  },
  data() {
    return {
      WorkType,
      WorkTypeMap,
      users: [],
      formInline: {
        userId: '',
        workType: '',
        date: [],
      },
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      tableData: [],
      lineArr: [],
      mapVisible: false,
    }
  },
  computed: {
    postData: function() {
      return {
        ...this.pageInfo,
        userId: this.formInline.userId,
        workType: this.formInline.workType,
        beginTime: this.formInline.date ? this.formInline.date[0] : '',
        endTime: this.formInline.date ? this.formInline.date[1] : '',
      }
    },
  },
  watch: {
    'pageInfo.pageNum': {
      handler: function() {
        this.schHandler()
      },
      immediate: true,
    },
    'pageInfo.pageSize': function() {
      this.schHandler()
    },
  },
  mounted() {
    this.getUsers()
  },
  methods: {
    openMapHandler(row) {
      let loading = this.$loading({
        lock: true,
        text: '正在加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      GuiJiService.getDetail(row.guijiId).then(res => {
        let { code, rows } = res.data
        if (code == 200) {
          let lineArr = []
          if (rows.length) {
            lineArr = rows.map(item => {
              return [item.lon, item.lat]
            })
            this.lineArr = lineArr
            this.mapVisible = true
          } else {
            this.$message({
              type: 'warning',
              message: '暂无轨迹',
            })
          }
        }
        loading.close()
      })
    },
    getUsers() {
      Service.allUser().then(res => {
        let { code, data } = res.data
        if (code === 200) {
          this.users = data.map(item => {
            return {
              value: item.userId,
              label: item.nickName,
            }
          })
        }
      })
    },

    schHandler() {
      console.log('search!')
      GuiJiService.getList({ ...this.postData }).then(res => {
        let { code, rows, total } = res.data
        if (code === 200) {
          this.tableData = rows
          this.pageInfo.total = total
        }
      })
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
.page {
  margin-top: 30px;
  text-align: right;
}
</style>
