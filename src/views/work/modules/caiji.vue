<!--
 * @Author: xiawang1024
 * @Date: 2023-06-12 17:49:02
 * @LastEditTime: 2023-08-07 09:42:36
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
        <el-button type="primary" @click="schHandler" icon="el-icon-search"
          >查询</el-button
        >
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="nickName" label="用户名"> </el-table-column>
      <el-table-column prop="workType" label="工种">
        <template slot-scope="scope">
          <span>{{ WorkTypeMap[scope.row.workType] }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="日期"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" size="small"
            >查看</el-button
          >
          <el-button @click="dealHandler(scope.row)" type="primary" size="small"
            >处理</el-button
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

    <el-dialog title="问题处理" :visible.sync="dialogDealVisible" fullscreen>
      <el-form :model="dealForm" label-width="160px">
        <el-form-item label="序号">
          <el-input v-model="dealForm.queNum" disabled> </el-input>
        </el-form-item>
        <el-form-item label="地点">
          <el-input v-model="dealForm.address" disabled> </el-input>
        </el-form-item>
        <el-form-item label="问题分类">
          <el-select
            v-model="dealForm.wtflvalue"
            placeholder="问题分类"
            clearable
          >
            <el-option
              v-for="item of QuestionType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="紧急程度">
          <el-select
            v-model="dealForm.jjcdvalue"
            placeholder="紧急程度"
            clearable
          >
            <el-option
              v-for="item of ImportantLevel"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="问题详情">
          <el-row>
            <el-input
              type="textarea"
              v-model="dealForm.wtxq"
              placeholder="问题详情"
              clearable
            >
            </el-input>
            <el-button @click="openTextDialog('wtxq')">选择</el-button>
          </el-row>
        </el-form-item>
        <el-form-item label="处理人">
          <el-select v-model="dealForm.userId" placeholder="处理人" clearable>
            <el-option
              v-for="item of users"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="处理进度">
          <el-select
            v-model="dealForm.dealProgress"
            placeholder="处理进度"
            clearable
          >
            <el-option
              v-for="item of DealProcess"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="处理过程">
          <el-input
            type="textarea"
            v-model="dealForm.dealDuration"
            placeholder="处理过程"
            clearable
          >
          </el-input>
          <el-button @click="openTextDialog('dealDuration')">选择</el-button>
        </el-form-item>
        <el-form-item label="发现人">
          <el-input v-model="dealForm.submitNickName" disabled> </el-input>
        </el-form-item>
        <el-form-item label="经度">
          <el-input v-model="dealForm.longitude" disabled> </el-input>
        </el-form-item>
        <el-form-item label="纬度">
          <el-input v-model="dealForm.latitude" disabled> </el-input>
        </el-form-item>
        <el-form-item label="问题远景照片">
          <div class="img-wrap">
            <el-image
              class="img"
              :src="`${IMGHOST}${dealForm.imageWtyj}`"
              :preview-src-list="[`${IMGHOST}${dealForm.imageWtyj}`]"
              fit="contain"
            >
            </el-image>
            <el-button class="btn" @click="openImgDialog('imageWtyj')"
              >选择</el-button
            >
          </div>
        </el-form-item>
        <el-form-item label="问题近景照片1">
          <div class="img-wrap">
            <el-image
              class="img"
              :src="`${IMGHOST}${dealForm.imageWtjj1}`"
              :preview-src-list="[`${IMGHOST}${dealForm.imageWtjj1}`]"
              fit="contain"
            >
            </el-image>
            <el-button class="btn" @click="openImgDialog('imageWtjj1')"
              >选择</el-button
            >
          </div>
        </el-form-item>
        <el-form-item label="问题近景照片2">
          <div class="img-wrap">
            <el-image
              class="img"
              :src="`${IMGHOST}${dealForm.imageWtjj2}`"
              :preview-src-list="[`${IMGHOST}${dealForm.imageWtjj2}`]"
              fit="contain"
            >
            </el-image>
            <el-button class="btn" @click="openImgDialog('imageWtjj2')"
              >选择</el-button
            >
          </div>
        </el-form-item>
        <el-form-item label="问题近景照片3">
          <div class="img-wrap">
            <el-image
              class="img"
              :src="`${IMGHOST}${dealForm.imageWtjj3}`"
              :preview-src-list="[`${IMGHOST}${dealForm.imageWtjj3}`]"
              fit="contain"
            >
            </el-image>
            <el-button class="btn" @click="openImgDialog('imageWtjj3')"
              >选择</el-button
            >
          </div>
        </el-form-item>
        <el-form-item label="完成后远景照片">
          <div class="img-wrap">
            <el-image
              class="img"
              :src="`${IMGHOST}${dealForm.imageWtyj_Wc}`"
              :preview-src-list="[`${IMGHOST}${dealForm.imageWtyj_Wc}`]"
              fit="contain"
            >
            </el-image>
            <el-button class="btn" @click="openImgDialog('imageWtyj_Wc')"
              >选择</el-button
            >
          </div>
        </el-form-item>
        <el-form-item label="完成后近景照片1">
          <div class="img-wrap">
            <el-image
              class="img"
              :src="`${IMGHOST}${dealForm.imageWtjj1Wc}`"
              :preview-src-list="[`${IMGHOST}${dealForm.imageWtjj1Wc}`]"
              fit="contain"
            >
            </el-image>
            <el-button class="btn" @click="openImgDialog('imageWtjj1Wc')"
              >选择</el-button
            >
          </div>
        </el-form-item>
        <el-form-item label="完成后近景照片2">
          <div class="img-wrap">
            <el-image
              class="img"
              :src="`${IMGHOST}${dealForm.imageWtjj2Wc}`"
              :preview-src-list="[`${IMGHOST}${dealForm.imageWtjj2Wc}`]"
              fit="contain"
            >
            </el-image>
            <el-button class="btn" @click="openImgDialog('imageWtjj2Wc')"
              >选择</el-button
            >
          </div>
        </el-form-item>
        <el-form-item label="完成后近景照片3">
          <div class="img-wrap">
            <el-image
              class="img"
              :src="`${IMGHOST}${dealForm.imagetjj3Wc}`"
              :preview-src-list="[`${IMGHOST}${dealForm.imagetjj3Wc}`]"
              fit="contain"
            >
            </el-image>
            <el-button class="btn" @click="openImgDialog('imagetjj3Wc')"
              >选择</el-button
            >
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDealVisible = false">取 消</el-button>
        <el-button type="primary" @click="dealFormSubmit">确 定</el-button>
      </span>
    </el-dialog>

    <el-drawer title="图片选择" :visible.sync="drawerImgVisible">
      <div class="drawer-img-wrap" v-for="item of noHostImgList" :key="item">
        <el-image class="img" fit="contain" :src="`${IMGHOST}${item}`">
        </el-image>

        <el-button class="btn" size="mini" @click="selectImg(item)"
          >选择</el-button
        >
      </div>
    </el-drawer>

    <el-drawer title="问题选择" :visible.sync="drawerTextVisible">
      <div class="drawer-text-wrap" v-for="item of content" :key="item">
        <div class="wrap" v-if="item.comment">
          <div class="text-wrap">
            <el-tag class="text">{{ item.comment }}</el-tag>
          </div>
          <el-button class="btn" size="mini" @click="selectText(item.comment)"
            >选择</el-button
          >
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
const IMGHOST = 'http://123.7.68.106:8089'
import * as Service from '@/api/index'
import * as ClientService from '@/api/service.js'
import { WorkType, WorkTypeMap } from '../conf.js'
import * as DangerService from '@/api/danger.js'
export default {
  name: 'Caiji',
  data() {
    return {
      IMGHOST,
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
      dialogDealVisible: false,
      dealForm: {
        locationinfoId: '',
        queNum: '',
        wtxq: '',
        userId: '',
        dealProgress: '',
        dealDuration: '',
        submitNickName: '',
        longitude: '',
        latitude: '',
        imageWtyj: '',
        imageWtjj1: '',
        imageWtjj2: '',
        imageWtjj3: '',
        imageWtyj_Wc: '',
        imageWtjj1Wc: '',
        imageWtjj2Wc: '',
        imagetjj3Wc: '',
      },
      QuestionType: [],
      ImportantLevel: [],
      DealProcess: [],

      drawerImgVisible: false,
      noHostImgList: [],
      ImgField: '',

      drawerTextVisible: false,
      TextField: '',
    }
  },
  computed: {
    postData: function() {
      return {
        userId: this.formInline.userId,
        workType: this.formInline.workType,
        beginTime: this.formInline.date && this.formInline.date[0],
        endTime: this.formInline.date && this.formInline.date[1],
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
  mounted() {
    this.getUsers()
  },
  methods: {
    dealHandler(row) {
      this.dialogDealVisible = true
      let noHostImgList = []
      let content = []
      for (let i = 1; i <= 9; i++) {
        let noHostUrl = row[`imageUrl${i}`] ? row[`imageUrl${i}`] : ''

        let url = row[`imageUrl${i}`] ? IMGHOST + row[`imageUrl${i}`] : ''
        content.push({
          id: i,
          comment: row[`comment${i}`],
          imageUrl: url,
        })
        if (noHostUrl) {
          noHostImgList.push(noHostUrl)
        }
      }

      this.content = content
      this.noHostImgList = noHostImgList

      this.dealForm = {
        locationinfoId: row.locationinfoId,
        queNum: `${row.nickName}_${row.locationinfoId}`,
        address: row.comment1,
        wtflvalue: this.getValueByLabel(this.QuestionType, row.wtflvalue),
        jjcdvalue: this.getValueByLabel(this.ImportantLevel, row.jjcdvalue),
        submitNickName: row.nickName,
        longitude: row.longitude,
        latitude: row.latitude,
      }
    },
    getValueByLabel(arr, label) {
      let res = arr.find(item => item.label === label)
      return res ? res.value : ''
    },
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
      let noHostImgList = []
      for (let i = 1; i <= 9; i++) {
        let url = row[`imageUrl${i}`] ? IMGHOST + row[`imageUrl${i}`] : ''
        let noHostUrl = row[`imageUrl${i}`] ? row[`imageUrl${i}`] : ''
        content.push({
          id: i,
          comment: row[`comment${i}`],
          imageUrl: url,
        })

        if (url) {
          contentImgUrls.push(url)
        }

        if (noHostUrl) {
          noHostImgList.push(noHostUrl)
        }
      }
      this.content = content
      this.contentImgUrls = contentImgUrls
      this.noHostImgList = noHostImgList
      //获取详情，然后弹出框
      this.dialogVisible = true
    },
    schHandler() {
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

    openImgDialog(field) {
      this.drawerImgVisible = true
      this.ImgField = field
    },
    openTextDialog(field) {
      this.drawerTextVisible = true
      this.TextField = field
    },
    selectImg(url) {
      this.dealForm[this.ImgField] = url
      this.drawerImgVisible = false
    },

    selectText(text) {
      this.dealForm[this.TextField] = text
      this.drawerTextVisible = false
    },
    updateImgUrl(url) {
      return `${this.IMGHOST}${url}`
    },
    dealFormSubmit() {
      DangerService.deal(this.dealForm).then(res => {
        let { code } = res.data
        if (code === 200) {
          this.$message({
            message: '处理成功',
            type: 'success',
          })
          this.dialogDealVisible = false

          this.schHandler()
        }
      })
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

.img-wrap {
  display: flex;
  align-items: center;
  .img {
    width: 200px;
    height: 200px;
  }
  .btn {
    margin-left: 30px;
  }
}

.drawer-img-wrap {
  float: left;
  display: flex;
  align-items: center;
  padding: 0 20px;
  position: relative;
  width: 150px;
  height: 150px;
  margin-right: 20px;
  .img {
    width: 150px;
    height: 150px;
  }
  .btn {
    position: absolute;
    bottom: 0;
    right: 0;
    margin-left: 30px;
  }
}

.drawer-text-wrap {
  .wrap {
    padding: 20px;
    margin-bottom: 10px;
    border-bottom: 1px solid #efefef;
  }

  .btn {
    margin-top: 8px;
  }
}
</style>
