<!--
 * @Author: xiawang1024
 * @Date: 2023-06-12 17:20:27
 * @LastEditTime: 2023-06-14 10:21:11
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/views/work/index.vue
 * 工作，生活，健康
-->
<template>
  <div class="container">
    <NavHeader />
    <el-card class="wrap">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="轨迹查询" name="guiji"><guiji /></el-tab-pane>
        <el-tab-pane label="手动采集查询" name="caiji"><caiji /></el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import guiji from './modules/guiji.vue'
import caiji from './modules/caiji.vue'

import NavHeader from '@/components/nav/index.vue'

export default {
  name: 'Index',
  components: {
    NavHeader,
    guiji,
    caiji,
  },
  data() {
    return {
      activeName: 'guiji',
    }
  },
  methods: {
    goBack() {
      this.$router.push('/')
    },
  },
}
</script>

<style lang="less" scoped>
.wrap {
  margin: 15px auto;
  width: 98%;
  box-sizing: border-box;
}
</style>
