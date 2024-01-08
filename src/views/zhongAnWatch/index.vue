<!--
 * @Author: xiawang1024
 * @Date: 2023-12-14 09:43:21
 * @LastEditTime: 2024-01-08 17:55:35
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/views/zhongAnWatch/index.vue
 * 工作，生活，健康
-->
<template>
  <div class="container">
    <NavHeader />
    <el-card class="card">
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

  created() {
    this.getDept()
  },
  mounted() {
    this.getData()
    this.timer = setInterval(() => {
      this.getData()
    }, 3000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
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
      ZhongAnService.getLast().then(res => {
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
    .item {
      position: relative;
      border: 1px solid #efefef;
      border-radius: 4px;
      flex: 1;
      margin: 5px;
      padding: 30px 0;
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
