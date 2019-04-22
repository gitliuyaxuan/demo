<template>
  <div class="login">
    <el-row type="flex" justify="center" align="middle" class="login-row">
      <el-col :xs="14" :sm="12" :md="10" :lg="8" :xl="6">
        <el-form :rules="rules" ref="loginForm" :model="loginForm" label-width="100px" class="login-form" label-position="top">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="loginForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
            <el-button @click="resetForm('loginForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 导入axios
import axios from 'axios'

export default {
  data () {
    return {
      // 表单数据对象
      loginForm: {
        // 用户名
        username: 'admin',
        // 密码
        password: '123456'
      },
      // 表单验证规则
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 5, max: 12, message: '用户名长度为5到12个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 12, message: '密码长度为6到12个字符', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    // 表单提交的代码逻辑
    submitForm (formName) {
      // 通过$refs获取到组件对象 并且调用组件的validate方法 进行表单验证
      this.$refs[formName].validate(valid => {
        // valid 形参表示 表单验证是否成功
        if (!valid) {
          // 验证失败的时候 代码中不需要任何处理 因为 错误信息都已经在页面中展示给用户了
          return false
        }
        // 表单验证成功
        // 1 获取到用户名和密码
        // 2 调用登录接口 完成登录
        axios.post('http://localhost:8888/api/private/v1/login', this.loginForm).then(res => {
          if (res.data.meta.status === 200) {
            localStorage.setItem('token', res.data.data.token)
            this.$router.push({name: 'home'})
          } else {
            this.$message({
              message: res.data.meta.msg,
              type: 'error',
              duration: 1000
            })
          }
        })
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style>
.login {
  height: 100%;
  background-color: #2d434c;
}

.login-row {
  height: 100%;
}

.login-form {
  min-width: 380px;
  padding: 30px 20px;
  border-radius: 10px;
  background-color: #fff;
}
</style>
