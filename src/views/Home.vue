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
          <div class="searchBox">
            <!-- 搜索图标 -->
            <svg class="icon icon-search" aria-hidden="true">
              <use xlink:href="#icon-search"></use>
            </svg>
            <!-- 弹框 -->
            <el-popover
              ref="popoverRef"
              placement="right"
              width="300"
              trigger="click"
              @after-leave="getSearchHistory"
              popper-class="my-popover"
            >
              <!-- <el-button slot="reference">click 激活</el-button> -->
              <input
                slot="reference"
                type="text"
                class="search"
                placeholder="搜索"
                onfocus="this.placeholder=''"
                onblur="this.placeholder='搜索'"
                v-model.trim="searchInput"
                @keydown="toSearchPage"
              />

              <!-- 搜索历史和建议区域 -->
              <div v-show="toggleSearch">
                <!-- 搜索历史 -->
                <section class="searchHistory-Box">
                  <div v-if="historyTags.length !== 0">
                    <span>搜索历史</span>
                    <svg
                      class="icon icon-delete"
                      aria-hidden="true"
                      @click="removeSearchHistory"
                    >
                      <use xlink:href="#icon-shanchuDelete"></use>
                    </svg>
                  </div>

                  <div class="tag-Box">
                    <el-tag
                      v-for="(item, i) in historyTags"
                      :key="i"
                      class="tag"
                      size="medium"
                      effect="plain"
                      type="info"
                      closable
                      @close="handleClose(item)"
                      @click="toSearchHistory(item)"
                    >
                      {{ item }}</el-tag
                    >
                  </div>
                </section>

                <!-- 热搜榜 -->
                <section class="hotSearch-Box">
                  <span class="hot-tittle">热搜榜</span>
                  <div>
                    <p
                      v-for="(item, i) in hotSearch"
                      :key="i"
                      @click="toHotSearch(item.searchWord)"
                    >
                      <span class="hot-index">{{ i + 1 }}</span>
                      <span class="searchWord">{{ item.searchWord }}</span
                      ><span class="score light-gray">{{ item.score }}</span>
                    </p>
                  </div>
                </section>
              </div>

              <!-- 搜索建议区域 -->
              <div class="suggestBox" v-show="!toggleSearch">
                <div class="suggest-search">
                  搜"<span class="blue">{{ searchInput }}</span
                  >"相关的结果 >
                </div>

                <!-- 单曲 -->
                <div class="songsBox">
                  <div class="search-tittle">
                    <svg class="icon icon-search" aria-hidden="true">
                      <use xlink:href="#icon-musicnot"></use>
                    </svg>
                    单曲
                  </div>
                  <div class="content">
                    <p
                      v-for="(item, i) in suggestionInfo.songs"
                      :key="i"
                      class="overHidden"
                    >
                      {{ item.name }} - {{ item.artists[0].name }}
                    </p>
                  </div>
                </div>

                <!-- 歌手 -->
                <div class="artistsBox">
                  <div class="search-tittle">
                    <svg class="icon icon-search" aria-hidden="true">
                      <use xlink:href="#icon-User"></use>
                    </svg>
                    歌手
                  </div>
                  <div class="content">
                    <p
                      v-for="(item, i) in suggestionInfo.artists"
                      :key="i"
                      class="overHidden"
                    >
                      {{ item.name }}
                    </p>
                  </div>
                </div>

                <!-- 专辑 -->
                <div class="albumsBox">
                  <div class="search-tittle">
                    <svg class="icon icon-search" aria-hidden="true">
                      <use xlink:href="#icon-music-albums"></use>
                    </svg>
                    专辑
                  </div>
                  <div class="content">
                    <p
                      v-for="(item, i) in suggestionInfo.albums"
                      :key="i"
                      class="overHidden"
                    >
                      {{ item.name }} - {{ item.artist.name }}
                    </p>
                  </div>
                </div>

                <!-- 歌单 -->
                <div class="playlistsBox">
                  <div class="search-tittle">
                    <svg class="icon icon-search" aria-hidden="true">
                      <use xlink:href="#icon-playlist2"></use>
                    </svg>
                    歌单
                  </div>
                  <div class="content">
                    <p
                      v-for="(item, i) in suggestionInfo.playlists"
                      :key="i"
                      class="overHidden"
                    >
                      {{ item.name }}
                    </p>
                  </div>
                </div>
              </div>
            </el-popover>
          </div>
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
      <el-container class="right-box"><router-view></router-view></el-container>
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
      searchInput: '', //搜索框
      suggestionInfo: {
        albums: [], //专辑
        artists: [], //歌手
        songs: [], //单曲
        playlists: [], //歌单
      },
      timer: null, //定时器
      hotSearch: [], //热搜榜
      historyTags: [], //搜索历史
      toggleSearch: true,
    }
  },
  mounted() {
    // 获取头像和用户name
    if (window.localStorage.getItem('userInfo')) {
      this.userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
    } else {
      this.$message.error('获取头像失败，请重新登陆！')
    }
    this.getSearchHistory() //获取搜索历史
  },
  created() {
    this.getHotSearch() //请求热搜榜数据
  },
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
    // 请求搜索建议数据
    async getSuggestionInfo() {
      const { data: res } = await this.$http.get('/search/suggest', {
        params: {
          keywords: this.searchInput,
        },
      })
      this.suggestionInfo.songs = res.result.songs
      this.suggestionInfo.artists = res.result.artists
      this.suggestionInfo.albums = res.result.albums
      this.suggestionInfo.playlists = res.result.playlists

      // console.log(this.suggestionInfo)
    },
    // 请求热搜榜数据
    async getHotSearch() {
      const { data: res } = await this.$http.get('/search/hot/detail')
      this.hotSearch = res.data
    },
    // 点击tag标签里面的删除，对应的标签会被移除
    handleClose(tag) {
      this.historyTags.splice(this.historyTags.indexOf(tag), 1)
      window.localStorage.setItem('searchHistory', this.historyTags.join())
    },
    // 调用后将输入框中的数据保存到localStorage中 并跳转到搜索成功的界面
    searchPage() {
      this.$refs.popoverRef.doClose()

      this.$router.push({
        path: `search/${this.searchInput}`,
      })
    },
    // 在搜索框中输入后按回车 跳转
    toSearchPage(e) {
      if (e.keyCode == 13 && this.searchInput) {
        this.setSearchHistory(this.searchInput)
        this.searchPage()
      }
    },
    // 向localStorage中添加输入的搜索历史
    setSearchHistory(tag) {
      // 进行搜索历史的重复判断
      const isHas = this.historyTags.some((item) => {
        return item === tag
      })
      if (isHas) return
      this.historyTags.push(tag)
      window.localStorage.setItem('searchHistory', this.historyTags.join())
      // console.log(this.HistoryTags)
    },
    // 获取localStore中的搜索历史
    getSearchHistory() {
      // console.log()
      if (window.localStorage.getItem('searchHistory'))
        this.historyTags = window.localStorage
          .getItem('searchHistory')
          .split(',')
    },
    // 点击垃圾桶图标 删除全部搜索历史
    removeSearchHistory() {
      window.localStorage.removeItem('searchHistory')
      // this.getSearchHistory()
      this.historyTags = []
    },
    // 点击热搜榜对应的行 携带参数跳转到搜索成功的页面
    toHotSearch(val) {
      this.searchInput = val

      this.setSearchHistory(this.searchInput)

      this.searchPage()
    },
    toSearchHistory(tag) {
      // console.log(tag)
      this.searchInput = tag
      this.searchPage()
    },
  },

  watch: {
    // 监听input值的变化
    searchInput(newVal, oldVal) {
      this.toggleSearch = false
      if (newVal === '') {
        // console.log(newVal, oldVal)
        this.toggleSearch = true
        return
      }
      // console.log('1')
      // clearTimeout(timer)
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.getSuggestionInfo()
      }, 500)
    },
  },
  components: { Nav, Player, Scroll },
}
</script>

<style>
.my-popover {
  font-size: 12px !important;
  overflow: auto;
  height: 430px;
  padding: 0 !important;
}
</style>
<style lang="less" scoped>
.right-box {
  // height: 100%;
  margin-bottom: 70px;
}
.suggest-search {
  padding: 10px;
  // margin-bottom: 6px;
}
.songsBox,
.artistsBox,
.albumsBox,
.playlistsBox {
  .search-tittle {
    padding-left: 20px;
    display: flex;
    align-items: center;
    height: 30px;
    // text-align: center;
    line-height: 30px;
    background-color: #f5f5f7;
  }
  .content {
    p {
      line-height: 30px;
      height: 30px;
      cursor: pointer;
      padding-left: 20px;
      // margin: 6px 0;
    }
    p:hover {
      background-color: #f2f2f2;
    }
  }
}

.searchHistory-Box {
  padding-left: 12px;
  .tag-Box {
    margin-bottom: 20px;
    .tag {
      cursor: pointer;
      margin: 10px 10px 0 0;
    }
    .tag:hover {
      background-color: #f2f2f2;
    }
  }
}
.hotSearch-Box {
  // margin-top: 20px;

  .hot-tittle {
    font-size: 16px;
    display: block;
    margin-bottom: 30px;
    padding-left: 12px;
  }
  p {
    height: 50px;
    line-height: 50px;
    padding-left: 12px;

    // margin-left: -1px;
    cursor: pointer;
    .searchWord {
      margin: 0 10px 0 30px;
    }
    .score {
      font-size: 10px;
    }
  }
  p:nth-child(-n + 3) .hot-index {
    color: #ff3a3a;
    font-size: 17px;
  }
  p:nth-child(-n + 3) .searchWord {
    font-weight: bold;
  }
  p:nth-child(n + 4) .hot-index {
    color: #c9c9c9;
  }
  p:hover {
    background-color: #f3f3f3;
  }
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
.searchBox {
  margin-top: 20px;
  position: relative;

  .search {
    // box-sizing: border-box;

    width: 170px;
    height: 30px;
    border-radius: 15px;
    border: 1px solid #eee;
    outline: none;
    padding-left: 30px;
    background-color: #f6f6f7;
  }
  .icon-search {
    top: 4px;
    left: 10px;
    position: absolute;
  }
}

header {
  position: fixed;
}
.icon-search {
  margin-right: 10px;
}
.icon-delete {
  margin: 5px 0 0 15px;
  font-size: 11px;
  cursor: pointer;
}
.icon-delete:hover {
  color: #000000;
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
