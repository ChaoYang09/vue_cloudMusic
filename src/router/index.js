import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import common from '@/utils/common'
const Home = () => import('@/views/Home.vue')
// const Login = () => import('@/views/Login.vue')
const Test = () => import('@/views/Test.vue')

//歌单
const SongLists = () => import('@/views/songlists/SongLists.vue')
const AlbumList = () => import('@/views/albumList/AlbumList.vue')
const DjList = () => import('@/views/djList/DjList.vue')
const Artist = () => import('@/views/artistList/ArtistList.vue')

// 搜索
const Search = () => import('@/views/Search.vue')

//发现
const Discovery = () => import('@/views/discover/Discovery.vue')

// 视频
const Video = () => import('@/views/aside/video/Video.vue')
const VideoPlayer = () => import('@/views/aside/video/VideoPlayer.vue')

// 个人相关
const Collect = () => import('@/views/user/Collect.vue')
const UserInfo = () => import('@/views/user/UserInfo.vue')
const EditUserInfo = () => import('@/views/user/EditUserInfo.vue')
const UserDj = () => import('@/views/user/UserDj.vue')
const DailySongs = () => import('@/views/user/DailySongs.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '/',
        redirect: '/discovery',
      },
      {
        path: '/discovery',
        component: Discovery,
      },
      {
        path: '/artist',
        component: Artist,
        meta: { needLogin: true },
      },
      {
        path: '/test',
        component: Test,
      },
      {
        path: '/songLists/:id',
        component: SongLists,
        meta: { needLogin: true },
      },
      {
        path: '/albumList/:id',
        component: AlbumList,
        meta: { needLogin: true },
      },
      {
        path: '/djList/:id',
        component: DjList,
        meta: { needLogin: true },
      },

      {
        path: '/collect',
        name: 'userCollect',
        component: Collect,
        meta: { needLogin: true },
      },
      {
        path: '/dailySongs',
        component: DailySongs,
        meta: { needLogin: true },
      },
      {
        path: '/userInfo/:id',
        component: UserInfo,
        meta: { needLogin: true },
      },
      {
        path: '/editUserInfo',
        component: EditUserInfo,
        meta: { needLogin: true },
      },
      {
        path: '/userDj',
        component: UserDj,
        meta: { needLogin: true },
      },
      {
        path: '/search/:keywords',
        component: Search,
        meta: { needLogin: true },
      },
      {
        path: '/video',
        component: Video,
        meta: { needLogin: true },
      },
      {
        path: '/videoPlayer/:id',
        component: VideoPlayer,
        meta: { needLogin: true },
      },
    ],
  },
  // {
  //   path: '/login',
  //   component: Login,
  //   meta: { needLogin: true },
  // },
]

const router = new VueRouter({
  routes,
  // mode: 'history',
  mode: 'hash',
})
// 页面跳转后回到顶部位置
router.beforeEach((to, from, next) => {
  if (to.meta.needLogin === true) {
    if (store.state.isLogin) {
      next()
    } else {
      store.commit('setLoginVisible', true)
    }
  } else {
    next()
  }
})
router.afterEach((to, from) => {
  const currentY = document.documentElement.scrollTop || document.body.scrollTop
  common.scrollAnimation(currentY, 0)
})
export default router
