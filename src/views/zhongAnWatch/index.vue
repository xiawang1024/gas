<!--
 * @Author: xiawang1024
 * @Date: 2023-12-14 09:43:21
 * @LastEditTime: 2024-01-09 10:40:15
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/views/zhongAnWatch/index.vue
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
              @change="deptChangeHandler"
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
      <Flow :info="info" />
    </el-card>
  </div>
</template>

<script>
import NavHeader from '@/components/nav/index.vue'
import Flow from '@/views/zhongAnWatch/flowDigita.vue'
import * as ZhongAnService from '@/api/zhongan.js'
import { GASTYPES, GASSTATUS, GASUINT } from './config'

export default {
  name: 'ZhongAn',
  components: {
    NavHeader,
    Flow,
  },
  data() {
    return {
      schForm: {
        deptId: '',
      },
      pageInfo: {
        pageNum: 1,
        pageSize: 4,
        total: 0,
      },
      depts: [],
      info: {},
      timer: null,
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

  async created() {
    await this.getDept()
    this.intervalGetData()
  },

  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    deptChangeHandler(val) {
      this.schForm.deptId = val
    },
    intervalGetData() {
      clearInterval(this.timer)
      this.getData()
      this.timer = setInterval(() => {
        this.getData()
      }, 5000)
    },

    schHandler() {
      this.getData()
    },
    resetHandler() {
      this.$refs.schForm.resetFields()
      this.getData()
    },
    async getDept() {
      try {
        let { data } = await ZhongAnService.getDept()
        this.depts = data
        this.schForm.deptId = [data[0].deptId]
      } catch (error) {
        console.log(error)
        return Promise.reject(error)
      }
    },
    getData() {
      ZhongAnService.getLast(this.postData).then(res => {
        let { code, data } = res.data
        if (code == 200) {
          this.info = data
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
.row {
  .column {
    display: flex;
    width: 100%;
    height: 50%;
    .item {
      position: relative;
      border: 1px solid #efefef;
      border-radius: 4px;
      flex: 1;
      margin: 5px;
      padding: 10px 0;
      .name {
        position: absolute;
        top: 0;
        right: 0;
        margin: 0;
        font-weight: bolder;
        font-size: 15px;
      }
    }
  }
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
