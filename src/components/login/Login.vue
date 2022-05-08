<template>
  <div class="login-wrap">
    <div class="user" @click="loginVisible = true">
      <span class="user-bg">
        <img v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" alt="" />
        <svg class="icon icon-user" aria-hidden="true" v-else>
          <use xlink:href="#icon-User"></use>
        </svg>
      </span>

      <span v-if="userInfo.nickname">{{ userInfo.nickname }}</span>
      <span v-else>未登录</span>
    </div>
    <!-- 登录对话框 -->
    <el-dialog
      title="登录"
      :visible.sync="loginVisible"
      width="350px"
      append-to-body
      @closed="$refs.loginFormRef.resetFields()"
    >
      <div class="loginBox">
        <div class="icon-login">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-undraw_login_re_4vu2"></use>
          </svg>
        </div>
        <div class="loginForm">
          <el-form
            ref="loginFormRef"
            :model="loginForm"
            :rules="rules"
            label-width="65px"
            size="small"
            label-position="left"
          >
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="loginForm.phone"></el-input> </el-form-item
            ><el-form-item label="密码" prop="password">
              <el-input
                v-model="loginForm.password"
                show-password
              ></el-input> </el-form-item
          ></el-form>
          <el-button @click="login" size="small">登录</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { phoneLogin } from '@/api/login'
import { getLikeList } from '@/api/music'

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
      loginVisible: false, //登陆对话框
      // 登陆表单
      loginForm: {
        phone: '',
        password: '',
      },
      //个人信息
      userInfo: {
        nickname: '',
        avatarUrl: '',
      },
      // 表单规则
      rules: {
        phone: [
          { required: true, trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' },
        ],
        password: [
          { required: true, trigger: 'blur' },
          { validator: checkPassword, trigger: 'blur' },
        ],
      },
    }
  },
  mounted() {
    // 获取头像和用户name
    if (window.localStorage.getItem('userInfo')) {
      this.userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
    } else {
      this.$message.error('获取头像失败，请重新登陆！')
    }
  },
  created() {
    this.getLikeList()
  },
  methods: {
    //点击登录界面的登录按钮
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        // console.log(valid)
        if (!valid) return this.$message.info('请输入完整信息!')
        await phoneLogin({
          phone: this.loginForm.phone,
          password: this.loginForm.password,
        }).then((res) => {
          if (res.code === 502) return this.$message.error('密码错误!')
          window.sessionStorage.setItem('token', res.token)
          window.sessionStorage.setItem('uid', res.profile.userId)

          // window.sessionStorage.setItem('cookie', res.cookie)
          const userInfo = {
            nickname: res.profile.nickname,
            avatarUrl: res.profile.avatarUrl,
          }
          window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
          this.userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
          // this.uid = res.profile.userId

          // this.userInfo = res
          this.$message.success('登陆成功!')
          this.loginVisible = false
        })
        // await this.getPlaylist()
      })
    },
    async getLikeList() {
      const res = await getLikeList(297835213)
      const ids = res.ids
      this.$store.commit('setLikeIds', ids)
    },
  },
}
</script>

<style lang="less" scoped>
.user {
  display: flex;
  align-items: center;
  cursor: pointer;
  .user-bg {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #e0e0e0;
    margin-right: 10px;
    // text-align: center;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
    .icon-user {
      font-size: 17px;
      color: #ffffff;
    }
  }
}
.loginBox {
  display: flex;
  // justify-content: center;
  align-items: center;
  flex-direction: column;
  .icon-login {
    // color: #ea4848;
    color: cadetblue;
    font-size: 90px;
  }
  .el-button--small {
    margin-left: 10px;
    color: #ffffff;
    background-color: #ea4848;
    padding: 9px 115px;
  }
  .el-button:hover {
    color: #ffffff !important;
    background-color: #c72e2e !important;
  }
}
.el-dialog {
  // z-index: 100;
}
</style>
