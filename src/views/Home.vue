<template>
  <el-container>
    <el-container>
      <!-- 左侧内容区域 -->
      <el-aside width="210px">
        <!-- <div class="musicIcon">NetEase</div> -->
        <header>
          <!-- 个人头像区 -->
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
          <!-- 搜索框区域 -->
          <Search></Search>
        </header>

        <!-- 左侧功能栏 -->
        <div class="lyric-wrap" ref="lyricList">
          <ul class="content">
            <li><router-link to="/discovery">发现音乐</router-link></li>
            <li><router-link to="/search">搜索</router-link></li>
            <li><router-link to="/video">视频</router-link></li>
            <!-- <li><router-link to="/videoPlayer">视频播放器</router-link></li> -->
            <li><router-link to="/test">test</router-link></li>
            <li><router-link to="/songLists">songLists</router-link></li>
            <li><router-link to="/player">player</router-link></li>
            <li><router-link to="/collect">我的收藏</router-link></li>
            <li><router-link to="/userInfo">我的信息</router-link></li>
            <li><router-link to="/editUserInfo">编辑信息</router-link></li>
            <li><router-link to="/myDj">我的电台</router-link></li>

            <li><router-link to="/editUserInfo">编辑信息</router-link></li>
          </ul>
        </div>
      </el-aside>

      <!-- 右侧内容区域 -->
      <el-container class="right-box">
        <!-- <transition name="el-fade-in-linear"> -->
        <router-view></router-view>
        <!-- </transition> -->
        <el-backtop :bottom="80" :right="20"></el-backtop>
      </el-container>
    </el-container>

    <!-- 歌词页面 -->
    <!-- <keep-alive> -->
    <transition name="slide-fade">
      <Player v-show="$store.state.isPlayerShow"></Player>
    </transition>
    <!-- </keep-alive> -->

    <!-- 底部导航栏 -->
    <Nav class="nav"></Nav>

    <!-- 登录对话框 -->
    <el-dialog
      title="登录"
      :visible.sync="loginVisible"
      width="350px"
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

      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span> -->
    </el-dialog>
  </el-container>
</template>

<script>
import Scroll from '@/components/Scroll.vue'
// import BScroll from 'better-scroll'
import Search from '@/components/search/Search.vue'
import Nav from '../components/Nav.vue'
import Player from '../components/Player.vue'
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
  created() {},
  methods: {
    //点击登录界面的登录按钮
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
        // window.sessionStorage.setItem('cookie', res.cookie)
        const userInfo = {
          nickname: res.profile.nickname,
          avatarUrl: res.profile.avatarUrl,
        }
        window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
        this.userInfo = JSON.parse(window.localStorage.getItem('userInfo'))

        // this.userInfo = res
        this.$message.success('登陆成功!')
        this.loginVisible = false
      })
    },
  },

  components: { Nav, Player, Scroll, Search },
}
</script>

<style lang="less" scoped>
.right-box {
  // height: 100%;
  margin-bottom: 70px;
}

.nav {
  padding: 0 20px;
  // margin-right: 5px;
  background-color: #f6f6f8;
  position: fixed;
  z-index: 12;
  bottom: 0;
  width: 100%;
  height: 60px;
}

.el-aside {
  background-color: #ffffff;
  border-right: 1px rgb(221, 220, 220) solid;
  color: #1c1c1c;
  padding: 20px;
}
::-webkit-scrollbar {
  width: 0 !important;
}
.lyric-wrap {
  // width: 100%;
  margin-top: 110px;
  width: 194px;
  height: 400px;
  overflow-y: auto;

  // background-color: antiquewhite;
  position: fixed;

  .content {
    // margin: 20px auto;
    // width: 170px;
    li {
      // line-height: 35px;
      padding-left: 10px;
      width: 170px;
      margin: 4px 0;
      height: 35px;
      line-height: 40px;
      font-size: 17px;
      color: #1c1c1c !important;
    }
  }
  ul li:hover {
    background-color: #f6f6f7;
    border-radius: 10px;
    // height: 30px;
  }
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

header {
  position: fixed;
}

.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.5s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(600px);
  opacity: 0;
}
.router-link-active {
  display: block;
  /* box-sizing: border-box; */
  width: 170px;
  height: 35px;
  color: #242222;
  font-size: 20px;
  font-weight: 600;
  margin-left: -10px;
  padding-left: 10px;
  background-color: #f6f6f7;
  border-radius: 10px;
}
</style>
