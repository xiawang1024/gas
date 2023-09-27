<!--
 * @Author: xiawang1024
 * @Date: 2023-06-13 16:00:16
 * @LastEditTime: 2023-09-27 16:13:08
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/views/danger/index.vue
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
          v-if="false"
          >新增</el-button
        >
        <el-form :inline="true" :model="schForm" ref="schForm">
          <el-form-item label="紧急程度" prop="jjcdvalue">
            <el-select
              v-model="schForm.jjcdvalue"
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
          <el-form-item label="问题分类" prop="wtflvalue">
            <el-select
              v-model="schForm.wtflvalue"
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
        <el-table-column prop="queNum" label="清单序号" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="生成时间"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="nickName"
          label="整改责任人"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="wtxq" label="隐患内容" show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          prop="jjcdvalue"
          label="紧急程度"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div>
              {{ ImportantLevelMap[scope.row.jjcdvalue] }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="dealProgress"
          label="处理进度"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div>
              {{ DealProcessMap[scope.row.dealProgress] }}
            </div>
          </template>
        </el-table-column>

        <el-table-column
          prop="submitNickName"
          label="隐患排查人"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="locationinfoId"
          label="手动采集序号"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="name" label="相应照片" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button size="mini" @click="openImgDialog(scope.row)"
              >查看</el-button
            >
          </template>
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
              v-if="false"
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
      title="照片"
      :visible.sync="ImgDialogVisible"
      width="950px"
      top="10vh"
    >
      <div class="dialog-wrap">
        <div class="img-wrap" v-for="item of ImgUrls" :key="item.key">
          <p>{{ item.val }}</p>
          <el-image
            style="width: 200px; height: 200px"
            :src="item.url"
            fit="contain"
            :preview-src-list="previewImgUrls"
          ></el-image>
        </div>
      </div>
    </el-dialog>

    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="800px">
      <el-form
        :inline="true"
        :model="dealForm"
        label-width="100px"
        :disabled="dialogType == 2"
      >
        <el-form-item label="紧急程度" prop="jjcdvalue">
          <el-select
            v-model="dealForm.jjcdvalue"
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
        <el-form-item label="问题分类" prop="wtflvalue">
          <el-select
            v-model="dealForm.wtflvalue"
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
        <el-form-item label="整改责任人">
          <el-input
            class="fixWidth"
            v-model="dealForm.nickName"
            placeholder="整改责任人"
          ></el-input>
        </el-form-item>

        <el-form-item label="处理进度">
          <el-select
            v-model="dealForm.dealProgress"
            placeholder="处理进度"
            clearable
            class="fixWidth"
          >
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="item of DealProcess"
              :key="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="隐患排查人">
          <el-input
            class="fixWidth"
            v-model="dealForm.submitNickName"
            placeholder="请输入隐患排查人"
          ></el-input>
        </el-form-item>
        <el-form-item label="隐患内容">
          <el-input
            class="fixWidth"
            type="textarea"
            rows="4"
            v-model="dealForm.wtxq"
            placeholder="请输入隐患内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="处理过程">
          <el-input
            class="fixWidth"
            type="textarea"
            rows="4"
            v-model="dealForm.dealDuration"
            placeholder="请输入处理过程"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateHandler">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import NavHeader from '@/components/nav/index.vue'
import * as ClientService from '@/api/service.js'

import * as DangerService from '@/api/danger'

const IMGHOST = process.env.VUE_APP_API_HOST

export default {
  name: 'Danger',
  components: {
    NavHeader,
  },
  data() {
    return {
      schForm: {
        wtflvalue: '',
        jjcdvalue: '',
      },
      tableData: [],
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      dialogVisible: false,
      dialogType: 0, // 0 新增 1 编辑 2 查看
      QuestionType: [],
      ImportantLevel: [],
      DealProcess: [],
      ImgDialogVisible: false,
      ImgUrls: [],
      dealForm: {},
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
    DealProcessMap() {
      let map = {}
      this.DealProcess.length &&
        this.DealProcess.forEach(item => {
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
    previewImgUrls() {
      return this.ImgUrls.length && this.ImgUrls.map(item => item.url)
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
    ClientService.getDict('deal_progress').then(res => {
      let { code, data } = res.data
      if (code === 200) {
        this.DealProcess = data.map(item => {
          return {
            label: item.dictLabel,
            value: item.dictValue,
          }
        })
      }
    })
  },
  methods: {
    updateHandler() {
      DangerService.update(this.dealForm).then(res => {
        let { code } = res.data
        if (code === 200) {
          this.$message({
            type: 'success',
            message: '操作成功!',
          })
          this.getData()
          this.dialogVisible = false
        }
      })
    },
    openImgDialog(row) {
      let ImgKeys = [
        {
          key: 'imageWtyj',
          val: '问题远景照片',
        },
        {
          key: 'imageWtjj1',
          val: '问题近景照片1',
        },
        {
          key: 'imageWtjj2',
          val: '问题近景照片2',
        },
        {
          key: 'imageWtjj3',
          val: '问题近景照片3',
        },
        {
          key: 'imageWtyj_Wc',
          val: '问题远景照片(完成)',
        },
        {
          key: 'imageWtjj1Wc',
          val: '问题近景照片1(完成)',
        },
        {
          key: 'imageWtjj2Wc',
          val: '问题近景照片2(完成)',
        },
        {
          key: 'imagetjj3Wc',
          val: '问题近景照片3(完成)',
        },
      ]
      this.ImgUrls = ImgKeys.map(item => {
        return {
          key: item.key,
          val: item.val,
          url: row[item.key] ? `${IMGHOST}${row[item.key]}` : '',
        }
      })
      this.ImgDialogVisible = true
    },
    getData() {
      DangerService.get({ ...this.pageInfo, ...this.schForm }).then(res => {
        let { code, rows, total } = res.data
        if (code === 200) {
          this.tableData = rows
          this.pageInfo.total = total
        }
      })
    },
    schHandler() {
      this.getData()
    },
    resetHandler() {
      this.$refs.schForm.resetFields()
      this.pageInfo.pageNum = 1
      this.getData()
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
          this.dealForm = row
          break
        case 1:
          this.dialogVisible = true
          this.dialogType = 1
          this.dealForm = row
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

.dialog-wrap {
  display: flex;
  flex-wrap: wrap;
}
.img-wrap {
  margin-right: 20px;
  flex: 0 0 200px;
  width: 200px;
}
</style>
