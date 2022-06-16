<template>
  <div class="login-wrap">
    <!-- <button @click="toggleLoginState">切换登录状态</button> -->
    <!-- {{ JSON.stringify($store.state.music) !== '{}' }} -->
    <!-- 已登录 -->
    <div class="user" v-if="isLogin" @click="common.toUser(uid)">
      <span class="user-bg">
        <img v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" alt="" />
      </span>

      <span class="hidden-1" style="width: 100px" v-if="isLogin">{{
        userInfo.nickname
      }}</span>
      <svg
        class="icon position deep-gray"
        aria-hidden="true"
        style="top: 2px"
        @click.stop="loginOutVisible = true"
      >
        <use xlink:href="#icon-close1"></use>
      </svg>
    </div>
    <!-- 未登录 -->
    <div class="user" v-else @click="$store.commit('setLoginVisible', true)">
      <span class="user-bg">
        <svg class="icon icon-user" aria-hidden="true">
          <use xlink:href="#icon-User"></use>
        </svg>
      </span>
      <span>未登录</span>
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
    <!-- 退出对话框 -->
    <el-dialog
      title="退出登录"
      :visible.sync="loginOutVisible"
      append-to-body
      width="350px"
    >
      <span>是否退出</span>

      <span slot="footer" class="dialog-footer">
        <span class="btn btn-l mr-10" @click="loginOutVisible = false"
          >取消</span
        >
        <span class="btn btn-l btn-red" @click="loginOut">确定</span>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { phoneLogin, loginOut } from '@/api/login'
import { getLikeList } from '@/api/music'
import { mapState } from 'vuex'

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
      loginOutVisible: false, //登陆对话框
      // 登陆表单
      loginForm: {
        phone: '',
        password: '',
      },
      //个人信息
      // userInfo: {
      // nickname: '',
      // avatarUrl: '',
      // },
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
    // if (window.localStorage.getItem('userInfo')) {
    // this.userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
    // } else {
    // this.$message.error('获取头像失败，请重新登陆！')
    // }
  },
  watch: {
    isLogin(newVal) {
      if (newVal == true) this.getLikeList()
    },
  },
  computed: {
    ...mapState(['uid', 'userInfo', 'loginVisible', 'isLogin']),
    loginVisible: {
      get() {
        return this.$store.state.loginVisible
      },
      set(val) {
        // console.log(val)
        this.$store.commit('setLoginVisible', val)
      },
    },
  },
  created() {},
  methods: {
    //点击登录界面的登录按钮
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        // console.log(valid)
        if (!valid)
          return this.$message({
            dangerouslyUseHTMLString: true,
            message:
              ' <svg class="icon font-23 mr-15"><use xlink:href="#icon-roundclosefill" /></svg>请输入完整信息 !',
            center: true,
            duration: 1500,
          })

        await phoneLogin({
          phone: this.loginForm.phone,
          password: this.loginForm.password,
        }).then((res) => {
          // console.log(res)
          if (res.code === 502)
            return this.$message({
              dangerouslyUseHTMLString: true,
              message:
                ' <svg class="icon font-23 mr-15"><use xlink:href="#icon-roundclosefill" /></svg>密码错误 !',
              center: true,
              duration: 1500,
            })
          // window.sessionStorage.setItem('token', res.token)
          // if (window.sessionStorage.getItem('uid'))
          // window.sessionStorage.removeItem('uid')
          // window.sessionStorage.setItem('uid', res.profile.userId)
          if (res.code !== 200)
            return this.$message({
              dangerouslyUseHTMLString: true,
              message:
                ' <svg class="icon font-23 mr-15"><use xlink:href="#icon-roundclosefill" /></svg>登陆失败 !',
              center: true,
              duration: 1500,
            })
          // window.sessionStorage.setItem('cookie', res.cookie)
          const userInfo = {
            nickname: res.profile.nickname,
            avatarUrl: res.profile.avatarUrl,
          }
          // window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
          // this.userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
          // this.uid = res.profile.userId

          // this.userInfo = res
          this.$message({
            dangerouslyUseHTMLString: true,
            message:
              ' <svg class="icon font-23 mr-15"><use xlink:href="#icon-success-filling" /></svg>登陆成功!',
            center: true,
            duration: 1500,
          })
          this.loginVisible = false
          this.$store.commit('setUserInfo', userInfo)
          this.$store.commit('setUid', res.account.id)
          this.$store.commit('setLoginState', true)
        })
        // await this.getPlaylist()
      })
    },
    async loginOut() {
      const res = await loginOut()
      // console.log(res)
      if (res.code !== 200) return

      this.$store.commit('setUid', 0)
      this.$store.commit('setLoginState', false)
      this.$store.commit('setLikeIds', [])

      this.loginOutVisible = false
      this.$message({
        dangerouslyUseHTMLString: true,
        message:
          ' <svg class="icon font-23 mr-15"><use xlink:href="#icon-success-filling" /></svg>退出登录成功 !',
        center: true,
        duration: 1500,
      })
      this.$router.push('/discovery')
    },
    async getLikeList() {
      const res = await getLikeList(this.uid)

      if (res.code !== 200)
        return this.$message({
          dangerouslyUseHTMLString: true,
          message:
            ' <svg class="icon font-23 mr-15"><use xlink:href="#icon-roundclosefill" /></svg>获取喜欢ID失败 !',
          center: true,
          duration: 1500,
        })
      const ids = res.ids
      this.$store.commit('setLikeIds', ids)
    },
    toggleLoginState() {
      if (this.isLogin == true) {
        this.$store.commit('setLoginState', false)
        this.$store.commit('setUid', 0)

        this.$store.commit('setLikeIds', [])
        this.$router.push('/discovery')
      } else {
        this.$store.commit('setUid', 297835213)

        this.$store.commit('setLoginState', true)
      }
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
