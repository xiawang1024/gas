<!--
 * @Author: xiawang1024
 * @Date: 2023-06-14 10:20:07
 * @LastEditTime: 2024-01-08 17:43:44
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/components/nav/index.vue
 * 工作，生活，健康
-->
<template>
  <div class="nav-wrap">
    <el-card>
      <el-page-header @back="goBack">
        <template slot="content">
          <div class="wrap">
            <div class="location">当前位置：{{ $route.meta.title }}</div>
            <el-dropdown size="medium" @command="handleCommand">
              <el-button type="primary">
                切换系统<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  :command="item.path"
                  v-for="item of permission_routes"
                  :key="item.path"
                  >{{ item.meta.title }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </template>
      </el-page-header>
      <el-button class="btn" @click="logOut">注销登录</el-button>
    </el-card>
  </div>
</template>

<script>
import localforage from 'localforage'
import { mapGetters } from 'vuex'
export default {
  name: 'Nav',
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['permission_routes']),
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
    goToPath(path) {
      this.$router.push(path)
    },

    handleCommand(command) {
      if (command == 'exit') {
        localforage.removeItem('token').then(() => {
          this.$router.push('/login')
        })
      } else {
        this.goToPath(command)
      }
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
::v-deep {
  .el-page-header__left {
    align-items: center;
  }
  .el-page-header__left {
    display: none;
  }
}
.wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .location {
    margin-right: 30px;
    font-size: 18px;
    color: #222222;
  }
}
</style>
