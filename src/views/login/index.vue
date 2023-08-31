<template>
  <div class="login-wrap">
    <div class="login-container">
      <h1 class="login-title">智慧燃气监控系统</h1>
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="username">
          <el-input
            v-model.trim="form.username"
            placeholder="请输入用户名"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model.trim="form.password"
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
            @keyup.enter.native="login"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="login"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import * as Service from '@/api/index'

import { mapActions } from 'vuex'

import localforage from 'localforage'

export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
    }
  },
  methods: {
    ...mapActions(['update_permissions']),
    login() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // 处理登录逻辑

          Service.login(this.form).then(res => {
            let { code, token, msg } = res.data
            if (code == 200) {
              localforage.setItem('token', `Bearer ${token}`)
              this.$router.push('/datav')
            } else {
              this.$message.error(msg)
            }
          })
        } else {
          return false
        }
      })
    },
  },
}
</script>

<style scoped>
.login-wrap {
  background-image: url('../home/img/bg.png');
  background-size: cover;
  background-position: center;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 10%;
  box-sizing: border-box;
}

.login-container {
  width: 400px;
  /* background-color: rgba(255, 255, 255, 0.9); */
  border-radius: 5px;
  padding: 20px;
}

.login-title {
  margin-bottom: 90px;
  text-align: center;
  font-size: 38px;
  font-weight: bold;
  color: #fff;
}

.login-subtitle {
  margin-bottom: 20px;
  text-align: center;
}

.el-form-item__label {
  font-weight: bold;
  color: #fff;
}

.el-input {
  border-radius: 20px;
}

.el-input__inner {
  height: 40px;
  font-size: 14px;
}

.login-btn {
  border-radius: 20px;
  width: 100%;
}
</style>
