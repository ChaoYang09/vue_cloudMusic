<template>
  <div class="home-wrap">
    <div class="main-wrap">
      <!-- 左侧内容区域 -->
      <div class="left-wrap">
        <!-- <div class="musicIcon">NetEase</div> -->
        <div class="left-content">
          <header>
            <!-- 个人头像区 -->
            <Login></Login>
            <!-- 搜索框区域 -->
            <Search></Search>
          </header>

          <!-- 左侧功能栏 -->
          <div class="func-wrap">
            <ul class="func-content">
              <li class="func">
                <router-link to="/discovery">发现音乐</router-link>
              </li>

              <li class="func">
                <router-link to="/video">视频</router-link>
              </li>
              <!-- 我的音乐 -->
              <div>
                <div class="ml-10 mt-20 mb-10 default gray">我的音乐</div>
                <li class="user" v-if="isLogin">
                  <router-link to="/collect">
                    <svg class="icon font-11 mr-10" aria-hidden="true">
                      <use xlink:href="#icon-106collect"></use>
                    </svg>
                    <span> 我的收藏 </span>
                  </router-link>
                </li>
                <!-- 我的电台 -->
                <li class="user" v-if="isLogin">
                  <router-link to="/userDj">
                    <svg
                      class="icon font-12 mr-10 position"
                      style="top: 3px"
                      aria-hidden="true"
                    >
                      <use
                        xlink:href="#icon-antenna_radiowaves_left_right"
                      ></use>
                    </svg>
                    <span>我的电台</span></router-link
                  >
                </li>
                <!-- <li class="user">
                <router-link class="align-center" to="/userInfo/297835213"
                  >用户界面</router-link
                >
              </li> -->
                <!-- <li class="user">
                  <router-link class="align-center" to="/test"
                    >TEST</router-link
                  >
                </li> -->
                <li class="user">
                  <router-link to="/dailySongs">
                    <svg
                      class="icon font-11 mr-10 position"
                      style="top: 1px"
                      aria-hidden="true"
                    >
                      <use xlink:href="#icon-calendar"></use>
                    </svg>
                    每日推荐</router-link
                  >
                </li>
              </div>

              <!-- 创建的歌单 -->
              <div>
                <div class="ml-10 mt-20 mb-10 default gray">创建的歌单</div>
                <div v-if="isLogin">
                  <li
                    class="user"
                    v-for="(item, i) in userCreatedLists"
                    :key="i"
                  >
                    <router-link :to="`/songLists/${item.id}`">
                      <svg
                        class="icon font-11 mr-10 position"
                        style="top: 2px"
                        aria-hidden="true"
                        v-if="i === 0"
                      >
                        <use xlink:href="#icon-love1"></use>
                      </svg>
                      <svg class="icon font-11 mr-10" aria-hidden="true" v-else>
                        <use xlink:href="#icon-Playlist"></use>
                      </svg>
                      <span> {{ item.name }}</span>
                    </router-link>
                  </li>
                </div>
              </div>
              <!-- 收藏的歌单 -->
              <div v-if="isLogin">
                <div class="ml-10 mt-20 mb-10 default gray">收藏的歌单</div>

                <li
                  class="user hidden-1"
                  v-for="(item, i) in userPlaylists"
                  :key="i"
                >
                  <router-link
                    class="align-center"
                    :to="`/songLists/${item.id}`"
                  >
                    <svg class="icon font-11 mr-10 mt-2" aria-hidden="true">
                      <use xlink:href="#icon-Playlist"></use>
                    </svg>
                    {{ item.name }}</router-link
                  >
                </li>
              </div>
            </ul>
          </div>
        </div>
      </div>

      <!-- 右侧内容区域 -->
      <div class="right-wrap">
        <transition name="el-fade-in-linear">
          <keep-alive include="userCollect,userDj">
            <router-view></router-view>
          </keep-alive>
        </transition>
        <el-backtop
          :bottom="80"
          :right="20"
          v-show="!$store.state.isPlayerShow"
        ></el-backtop>
      </div>
    </div>

    <!-- 歌词页面 -->

    <!-- <transition name="slide-fade"> -->
    <!-- <keep-alive> -->
    <Player
      :class="{
        'scale-in-bl': isPlayerShow === true,
        'slide-out-bl': isPlayerShow === false,
      }"
    ></Player>
    <!-- </keep-alive> -->

    <!-- :style="[
          { opacity: isPlayerShow ? 1 : 0 },
          { 'z-index': isPlayerShow ? 12 : 0 },
        ]" -->
    <!-- </transition> -->

    <!-- 底部导航栏 -->
    <Nav class="nav"></Nav>
  </div>
</template>

<script>
import { getUserPlaylist } from '@/api/user'
import { mapState } from 'vuex'
import Scroll from '@/components/Scroll.vue'
import Search from '@/components/search/Search.vue'
import Nav from '@/components/Nav.vue'
import Player from '@/components/Player.vue'
import Login from '@/components/login/Login.vue'
import { getVisitor } from '@/api/user'
export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload,
    }
  },
  data() {
    return {
      // nickName: '长草的颜文君',

      limit: 999,
      offset: 0,
      createdList: [],
      playlist: [],
      count: 0,
      isRouterAlive: true,
    }
  },
  computed: {
    ...mapState([
      'isPlayerShow',
      'uid',
      'isLogin',
      'userPlaylists',
      'userCreatedLists',
    ]),
  },
  watch: {
    isLogin(newVal) {
      if (newVal) this.$store.dispatch('getPlaylist')
    },
  },
  async created() {},
  methods: {
    async getPlaylist() {
      if (!this.$store.state.isLogin) return
      // console.log(this.uid)
      const res = await getUserPlaylist({
        uid: this.uid,
        limit: this.limit,
        offset: 0,
      })
      if (res.code !== 200) return
      // console.log(res)
      res.playlist.forEach((item) => {
        if (item.creator.userId == this.uid) this.count++
      })
      // this.createdList =
      // this.createdList[0].name = this.createdList[0].name.replace(
      //   this.nickName,
      //   '我'
      // )
      // console.log(this.createdList)
      this.$store.commit(
        'setUserCreatedLists',
        res.playlist.splice(0, this.count)
      )

      this.$store.commit('setUserPlaylists', res.playlist)
      // this.playlist = res.playlist
      this.count = 0
    },
    reload() {
      console.log('reLoad')
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    },
  },

  components: { Nav, Player, Scroll, Search, Login },
}
</script>

<style lang="less" scoped>
.home-wrap {
  // width: 100%;
}
.main-wrap {
  width: 100%;
  display: flex;
}
.left-wrap {
  // background-color: #ffffff;
  border-right: 1px rgb(221, 220, 220) solid;
  color: #1c1c1c;
  padding: 20px;
  min-height: 100vh;
  // height: 100px;
  width: 210px;
  .left-content {
    width: 210px;

    header {
      position: fixed;
      // z-index: 12;
    }
    .func-wrap {
      .func-content {
        margin-top: 110px;
        margin-bottom: 60px;
        // width: 210px;
        height: calc(100% - 190px);
        overflow-y: auto;
        overflow-x: hidden;
        position: fixed;
        li {
          padding-left: 10px;
          width: 170px;
          margin: 4px 0;
          height: 35px;
          line-height: 35px;
          font-size: 15px;
        }
      }
      ul li:hover {
        background-color: #f6f6f7;
        border-radius: 5px;
      }
    }
  }
}
.right-wrap {
  flex: 1;
  // height: 100%;
  min-width: 700px;
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

::-webkit-scrollbar {
  width: 0 !important;
}

.player {
  // opacity: 0;
  // z-index: 0;
}
.scale-in-bl {
  // opacity: 1;
  // z-index: 12;
  visibility: visible;
  animation: scale-in-bl 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}
.slide-out-bl {
  // opacity: 1;
  // z-index: 12;
  visibility: visible;
  animation: slide-out-bl 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}
// 0.55, 0.085, 0.68, 0.53
@keyframes scale-in-bl {
  0% {
    transform: scale(0);
    transform-origin: 0% 100%;
    opacity: 0;
    // z-index: 11;
  }
  100% {
    transform: scale(1);
    transform-origin: 0% 100%;
    // opacity: 1;
    // z-index: 11;
  }
}
@keyframes slide-out-bl {
  0% {
    // transform: translateY(0) translateX(0);
    transform: scale(1);
    transform-origin: 0% 100%;
    // z-index: -1;
    // z-index: 11;
    // opacity: 1;
  }
  100% {
    // transform: translateY(1000px) translateX(-1000px);
    transform: scale(0);
    transform-origin: 0% 100%;
    opacity: 0;
    // z-index: 11;
  }
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
.func {
  a {
    display: block;
    width: 170px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .router-link-active {
    font-size: 17px;
    // line-height: 35px;
    font-weight: 600;
    margin-left: -10px;
    padding-left: 10px;
    background-color: #f6f6f7;
    border-radius: 5px;
  }
}
.user {
  a {
    font-size: 14px;
    display: block;
    width: 170px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .router-link-active {
    // line-height: 35px;
    margin-left: -10px;
    padding-left: 10px;
    background-color: #f6f6f7;
    border-radius: 5px;
  }
}
</style>
