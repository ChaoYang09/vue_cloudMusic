<template>
  <el-container>
    <el-container>
      <el-aside width="210px">
        <!-- <div class="musicIcon">NetEase</div> -->
        <div class="sideNav">
          <ul>
            <li><router-link to="/discovery">发现音乐</router-link></li>
            <li><router-link to="/login">login</router-link></li>
            <li><router-link to="/test">test</router-link></li>
            <li><router-link to="/songLists">songLists</router-link></li>
            <li><router-link to="/player">player</router-link></li>
            <li><router-link to="/collect">我的收藏</router-link></li>
            <li><router-link to="/userInfo">我的信息</router-link></li>
            <li><router-link to="/editUserInfo">编辑信息</router-link></li>
          </ul>
        </div></el-aside
      >
      <el-container class="mainBox"><router-view></router-view></el-container>
    </el-container>
    <transition name="slide-fade">
      <Player v-show="$store.state.isPlayerShow"></Player>
    </transition>

    <Nav class="nav"></Nav>
  </el-container>
</template>

<script>
// import BScroll from 'better-scroll'

import Nav from '../components/Nav.vue'
import Player from '../components/Player.vue'
export default {
  created() {
    // this.$nextTick(() => {
    //   this.scroll = new BScroll(this.$refs.wrapper, {})
    // })
  },
  methods: {
    //实例化
    // initScroll() {
    //   let product = this.$refs.product //给需要区域滚动的内容的父盒子添加ref属性
    //   this.product = new BScroll(product, { click: true }) //better-scroll 默认会阻止浏览器的原生 click 事件,需要配置一下click属性
    // },
  },
  components: { Nav, Player },
}
</script>

<style lang="less" scoped>
.mainBox {
  margin-bottom: 50px;
}
.nav {
  padding: 0 20px;
  box-sizing: border-box;
  background-color: #f6f6f8;
  // background-color: aquamarine;
  position: fixed;
  z-index: 11;
  bottom: 0;
  width: 100%;
  height: 60px;
}
.el-aside {
  background-color: #ffffff;
  border-right: 1px rgb(221, 220, 220) solid;
  color: #1c1c1c;
  text-align: center;
  line-height: 200px;
  // height: 2000px;
  min-height: 100vh;
  // overflow: scroll;
  // -webkit-overflow-scrolling: touch;
}
.musicIcon {
  line-height: 60px;
}
.sideNav {
  ul {
    margin: 20px auto;
    width: 170px;
    li {
      height: 40px;
      line-height: 40px;
      font-size: 17px;
    }
  }
  ul li:hover {
    background-color: #e6e6e7;
    border-radius: 5px;
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
</style>
