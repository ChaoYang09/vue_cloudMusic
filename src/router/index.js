import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('@/views/Home.vue')
const Login = () => import('@/views/Login.vue')
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
const MyDj = () => import('@/views/user/MyDj.vue')
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
        path: '/albumList/:id',
        component: AlbumList,
      },
      {
        path: '/djList/:id',
        component: DjList,
      },

      {
        path: '/collect',
        component: Collect,
      },
      {
        path: '/dailySongs',
        component: DailySongs,
      },
      {
        path: '/userInfo/:id',
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
