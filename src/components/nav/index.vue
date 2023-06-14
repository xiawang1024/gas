<!--
 * @Author: xiawang1024
 * @Date: 2023-06-14 10:20:07
 * @LastEditTime: 2023-06-14 10:24:30
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/components/nav/index.vue
 * 工作，生活，健康
-->
<template>
  <div class="nav-wrap">
    <el-card>
      <el-page-header @back="goBack" :content="$route.meta.title">
      </el-page-header>
      <el-button class="btn" @click="logOut">注销登录</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Nav',
  data() {
    return {}
  },
  mounted() {
    console.log(this.$route)
  },
  methods: {
    goBack() {
      this.$router.push('/')
    },
    logOut() {
      localStorage.removeItem('token')
      this.$router.push('/login')
    },
  },
}
</script>

<style lang="less" scoped>
.btn {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
