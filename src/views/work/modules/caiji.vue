<!--
 * @Author: xiawang1024
 * @Date: 2023-06-12 17:49:02
 * @LastEditTime: 2023-06-13 16:25:02
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/views/work/modules/caiji.vue
 * 工作，生活，健康
-->
<template>
  <div class="container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="用户名">
        <el-select v-model="formInline.userId" placeholder="用户名" clearable>
          <el-option
            v-for="item of users"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="工种">
        <el-select v-model="formInline.workType" placeholder="工种" clearable>
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
          clearable
          value-format="yyyy-MM-dd HH:mm:ss"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="nickName" label="用户名"> </el-table-column>
      <el-table-column prop="nickName" label="工种">
        <template slot-scope="scope">
          <span>{{ WorkTypeMap[scope.row.workType] }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="日期"> </el-table-column>
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
        :current-page="pageInfo.pageNum"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pageInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.total"
      >
      </el-pagination>
    </div>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <div v-for="item of content" :key="item.id">
        <el-card
          v-if="item.imageUrl || item.comment"
          style="margin-bottom: 10px;"
        >
          <div class="dialog-card">
            <el-image
              v-if="item.imageUrl"
              style="width: 100px; height: 100px"
              :src="item.imageUrl"
              :preview-src-list="contentImgUrls"
            >
            </el-image>
            <p>{{ item.comment }}</p>
          </div>
        </el-card>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as Service from '@/api/index'
import { WorkType, WorkTypeMap } from '../conf.js'
export default {
  name: 'Guiji',
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
      dialogVisible: false,
      content: [],
      contentImgUrls: [],
    }
  },
  computed: {
    postData: function() {
      return {
        userId: this.formInline.userId,
        workType: this.formInline.workType,
        beginTime: this.formInline.date[0],
        endTime: this.formInline.date[1],
      }
    },
  },
  watch: {
    'pageInfo.pageNum': function() {
      this.onSubmit()
    },
    'pageInfo.pageSize': function() {
      this.onSubmit()
    },
  },
  mounted() {
    this.getUsers()
  },
  methods: {
    getUsers() {
      Service.allUser().then(res => {
        console.log(res)
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
    handleClick(row) {
      console.log(row)
      let content = []
      let contentImgUrls = []
      for (let i = 1; i <= 9; i++) {
        content.push({
          id: i,
          comment: row[`comment${i}`],
          imageUrl: row[`imageUrl${i}`],
        })

        if (row[`imageUrl${i}`]) {
          contentImgUrls.push(row[`imageUrl${i}`])
        }
      }
      this.content = content
      this.contentImgUrls = contentImgUrls
      //获取详情，然后弹出框
      this.dialogVisible = true
    },
    onSubmit() {
      console.log('submit!')
      Service.caiji({ ...this.postData, ...this.pageInfo }).then(res => {
        let { code, rows, total } = res.data
        if (code === 200) {
          this.tableData = rows
          this.pageInfo.total = Number(total)
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
#guiji {
  height: calc(100vh - 280px);
  width: 100%;
}
.page {
  margin-top: 30px;
  text-align: right;
}

.dialog-card {
  display: flex;
  align-items: flex-start;
  p {
    margin: 0 0 0 10px;
    line-height: 2;
    font-size: 15px;
  }
}
</style>
