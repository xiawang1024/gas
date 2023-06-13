<!--
 * @Author: xiawang1024
 * @Date: 2023-06-13 16:00:16
 * @LastEditTime: 2023-06-13 16:03:34
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/views/service/index.vue
 * 工作，生活，健康
-->
<template>
  <div class="container">
    <el-card>
      <el-page-header @back="goBack" content="客户服务"> </el-page-header>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {}
  },
  methods: {
    goBack() {
      this.$router.push('/')
    },
  },
}
</script>

<style lang="scss" scoped></style>
