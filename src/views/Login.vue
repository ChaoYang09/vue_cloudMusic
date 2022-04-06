<template>
  <el-container>
    <div class="aside"></div>
    <el-card class="box-card">
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="loginForm.phone"></el-input> </el-form-item
        ><el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password"></el-input> </el-form-item
      ></el-form>
      <el-button @click="login">登录</el-button></el-card
    >
  </el-container>
</template>

<script>
export default {
  data() {
    var checkPhone = (rule, value, callback) => {
      const regPhone =
        /^1(3\d|4[5-8]|5[0-35-9]|6[567]|7[01345-8]|8\d|9[025-9])\d{8}$/
      if (regPhone.test(value)) {
        return callback()
      }
      callback(new Error('请输入合法手机号'))
    }
    var checkPassword = (rule, value, callback) => {
      const regPassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/
      if (regPassword.test(value)) {
        return callback()
      }
      callback(new Error('请输入合法密码'))
    }
    return {
      loginForm: {
        phone: '',
        password: '',
      },
      // 表单规则
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: checkPassword, trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        // console.log(valid)
        if (!valid) return this.$message.info('请输入完整信息!')
        const { data: res } = await this.$http.post(
          '/login/cellphone',
          this.loginForm
        )
        // console.log(res)
        if (res.code === 502) return this.$message.error('密码错误!')
        window.sessionStorage.setItem('cookie', res.cookie)
        this.$message.success('登陆成功!')

        // const { data: res1 } = await this.$http.get('/login/status')
        // console.log(res1)
        this.$router.push('/')
      })
    },
  },
}
</script>

<style lang="less" scoped>
.aside {
  margin-top: 100px;
  margin-left: 60px;
}
.box-card {
  margin-top: 100px;
  margin-left: 100px;
  width: 350px;
  height: 400px;
}
</style>
