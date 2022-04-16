import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import Login from '../views/Login.vue'
import Test from '../views/Test.vue'
import SongLists from '../views/SongLists.vue'

import Search from '../views/Search.vue'
//发现
import Discovery from '../views/discover/Discovery.vue'
import Artist from '../views/discover/Artist.vue'
// import Artist from '../views/discover/Artist.vue'
// 视频
import Video from '../views/aside/video/Video.vue'
import VideoPlayer from '../views/aside/video/VideoPlayer.vue'
// 个人相关
import Collect from '../views/user/Collect.vue'
import UserInfo from '../views/user/UserInfo.vue'
import EditUserInfo from '../views/user/EditUserInfo.vue'
import MyDj from '../views/user/MyDj.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '/discovery',
        component: Discovery,
      },
      {
        path: '/artist',
        component: Artist,
      },
      {
        path: '/test',
        component: Test,
      },
      {
        path: '/songLists/:id',
        component: SongLists,
      },

      {
        path: '/collect',
        component: Collect,
      },
      {
        path: '/userInfo',
        component: UserInfo,
      },
      {
        path: '/editUserInfo',
        component: EditUserInfo,
      },
      {
        path: '/myDj',
        component: MyDj,
      },
      {
        path: '/search/:keywords',
        component: Search,
      },
      {
        path: '/video',
        component: Video,
      },
      {
        path: '/videoPlayer/:id',
        component: VideoPlayer,
      },
    ],
  },
  {
    path: '/login',
    component: Login,
  },
]

const router = new VueRouter({
  routes,
})

export default router
