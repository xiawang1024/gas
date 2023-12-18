<!--
 * @Author: xiawang1024
 * @Date: 2023-06-14 10:20:07
 * @LastEditTime: 2023-12-18 09:49:15
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/components/navClient/index.vue
 * 工作，生活，健康
-->
<template>
  <div class="nav-wrap">
    <el-card>
      <div class="wrap">
        <p class="title">查询系统</p>
        <el-button class="btn" @click="logOut">注销登录</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import localforage from 'localforage'
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
      localforage.removeItem('token').then(() => {
        this.$router.push('/login')
      })
    },
  },
}
</script>

<style lang="less" scoped>
.wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .title {
    margin: 0;
    font-size: 20px;
    font-weight: bolder;
  }
}
</style>
