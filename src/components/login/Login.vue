<template>
  <div class="login-by-qr">
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
    <div class="user" v-else @click="openLoginDialog">
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
      lock-scroll
      custom-class="dialog-style"
      @closed="loginDialogClosed"
    >
      <!-- @closed="$refs.loginFormRef.resetFields()" -->
      <div class="msg-wrap">
        打开<a
          style="text-decoration: none; color: blue"
          href="https://music.163.com/#/download"
          target="_blank"
          >网易云音乐手机端</a
        >扫码登录
      </div>
      <div class="img-wrap">
        <img class="img img-h" :src="imgData" />
        <div
          class="btn-refresh pointer"
          @click="getKey"
          v-show="qrType === 800"
        >
          <i class="el-icon-refresh-left"></i>
        </div>
      </div>

      <div class="msg-wrap">状态：{{ message }}</div>
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
import { getQrKey, createQr, checkQr, getAccountInfo } from '@/api/user'
import { loginOut } from '@/api/login'
import { getLikeList } from '@/api/music'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      key: '',
      imgData: '',
      qrType: '',
      message: '',
      loginOutVisible: false, //登陆对话框
    }
  },
  methods: {
    /* 获取二维码key */
    async getKey() {
      const res = await getQrKey()
      if (res.code !== 200) return this.$message.error('获取二维码失败')
      this.key = res.data.unikey
      this.createQr()
    },
    /* 生成二维码 */
    async createQr() {
      const res = await createQr(this.key)
      if (res.code !== 200) return this.$message.error('生成二维码失败')
      this.imgData = res.data.qrimg
      this.checkQr()
    },
    /* 800 为二维码过期,801 为等待扫码,802 为待确认,803 为授权登录成功(803 状态码下会返回 cookies) */
    /* 检查二维码状态 */
    async checkQr() {
      console.log(11)
      const res = await checkQr(this.key)
      this.qrType = res.code
      this.message = res.message
      if (res.code === 801 || res.code === 802) {
        this.timer = window.setTimeout(() => {
          this.checkQr()
        }, 5000)
      } else if (res.code === 803) {
        const { cookie } = res
        // localStorage.setItem('Music_Cookie', res.cookie)
        const {
          profile: { nickname, avatarUrl, userId },
        } = await getAccountInfo(cookie)
        // console.log(accountInfo)
        const userInfo = {
          nickname,
          avatarUrl,
        }
        this.$message({
          dangerouslyUseHTMLString: true,
          message:
            ' <svg class="icon font-23 mr-15"><use xlink:href="#icon-success-filling" /></svg>登陆成功!',
          center: true,
          duration: 1500,
        })
        this.loginVisible = false
        this.$store.dispatch('getLikeList')
        this.$store.commit('setUserInfo', userInfo)
        this.$store.commit('setUid', userId)
        this.$store.commit('setLoginState', true)
        window.clearTimeout(this.timer)
      }
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
    openLoginDialog() {
      this.$store.commit('setLoginVisible', true)
      this.getKey()
    },
    loginDialogClosed() {
      window.clearTimeout(this.timer)
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
  beforeDestroy() {
    window.clearTimeout(this.timer)
  },
}
</script>

<style lang="less" scoped>
.login-by-qr {
  position: relative;
}
.img-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  margin: 0 auto;
  .btn-refresh {
    position: absolute;
    width: 200px;
    height: 200px;
    background-color: #ccc;
    opacity: 0.8;
    color: red;
    display: flex;
    justify-content: center;
    align-items: center;
    i {
      font-size: 30px;
    }
  }
}
.msg-wrap {
  text-align: center;
}
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
</style>
<style>
.dialog-style {
  /* height: 30%; */
}
</style>
