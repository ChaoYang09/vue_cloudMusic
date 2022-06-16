<template>
  <span class="button-wrap btn border" @click="handleCollect">
    <span class="align-center">
      <!-- 已收藏 -->
      <svg class="icon icon-common" aria-hidden="true" v-if="iconShow">
        <use xlink:href="#icon-yitianjia"></use>
      </svg>
      <!-- 收藏 -->
      <svg class="icon icon-common" aria-hidden="true" v-else>
        <use xlink:href="#icon-Collections"></use>
      </svg>
      <span v-show="iconShow">已</span>收藏
      <span v-show="type !== 'artist'"
        >({{ subCounts | playCountFormat }})</span
      >
      <!-- {{ subCount }} -->
    </span>
  </span>
</template>

<script>
import { getMediaSubList, collectMv } from '@/api/mv'
import { collectVideo } from '@/api/video'
import { getArtistSubList, collectArtist } from '@/api/artist'
import { getAlbumDetailDynamic, collectAlbum } from '@/api/album'
import { collectPlaylist } from '@/api/playlist'
import { getPlaylist } from '@/api/user'
import { getDjSubList, collectDj } from '@/api/dj'
import { mapState } from 'vuex'
export default {
  props: ['subCount', 'id', 'type'],
  data() {
    return {
      iconShow: null,
      t: null,
      subCounts: this.subCount,
    }
  },
  computed: {
    ...mapState(['isLogin', 'userPlaylists']),
  },
  created() {
    this.judgeType()
  },
  watch: {
    subCount(newVal) {
      this.subCounts = newVal
    },
    id(newVal) {
      // console.log(newVal);
      this.judgeType()
    },
    isLogin(newVal) {
      if (newVal) this.judgeType()
    },
  },

  methods: {
    // 根据type类型判断执行对应的函数
    judgeType() {
      switch (this.type) {
        case 'video':
          this.getMediaSubList()
          break
        case 'mv':
          this.getMediaSubList()
          break
        case 'playlist':
          this.getPlaylistIsCollect()
          break
        case 'artist':
          this.getArtistSubList()
          break
        case 'album':
          this.getAlbumDetailDynamic()
          break
        case 'dj':
          this.getDjSubList()
          break
      }
    },
    updatedUserCollect() {
      switch (this.type) {
        case 'video':
          this.$store.dispatch('getMv')
          break
        case 'mv':
          this.$store.dispatch('getMv')
          break
        case 'playlist':
          this.$store.dispatch('getPlaylist')
          break
        case 'artist':
          this.$store.dispatch('getArtist')
          break
        case 'album':
          this.$store.dispatch('getAlbum')
          break
        case 'dj':
          this.$store.dispatch('getDjRadios')
          break
      }
    },
    // 点击收藏按钮 进行收藏和取消收藏操作
    async handleCollect() {
      if (!this.$store.state.isLogin)
        return this.$store.commit('setLoginVisible', true)
      switch (this.type) {
        case 'video':
          this.collectVideo()
          break
        case 'mv':
          this.collectMv()
          break
        case 'playlist':
          this.collectPlaylist()
          break
        case 'artist':
          this.collectArtist()
          break
        case 'album':
          this.collectAlbum()
          break
        case 'dj':
          this.collectDj()
          break
      }
    },
    // 收藏后的message
    collectMessage(res) {
      if (res.code !== 200)
        return this.$message({
          dangerouslyUseHTMLString: true,
          message:
            ' <svg class="icon font-23 mr-15"><use xlink:href="#icon-roundclosefill" /></svg>收藏操作失败 !',
          center: true,
          duration: 1500,
        })
      this.updatedUserCollect()
      if (this.t === 1) {
        this.$message({
          dangerouslyUseHTMLString: true,
          message:
            ' <svg class="icon font-23 mr-15"><use xlink:href="#icon-success-filling" /></svg>取消收藏成功 !',
          center: true,
          duration: 1500,
        })

        this.iconShow = false
        this.t = -1
        if (this.type === 'artist') return
        this.subCounts--
      } else if (this.t === -1) {
        this.$message({
          dangerouslyUseHTMLString: true,
          message:
            ' <svg class="icon font-23 mr-15"><use xlink:href="#icon-success-filling" /></svg>收藏成功 !',
          center: true,
          duration: 1500,
        })
        this.iconShow = true
        this.t = 1
        if (this.type === 'artist') return

        this.subCounts++
      }
    },
    // 收藏视频
    async collectVideo() {
      const res = await collectVideo({
        id: this.id,
        t: -this.t,
      })
      this.collectMessage(res)
    },
    // 收藏MV
    async collectMv() {
      const res = await collectMv({ mvid: this.id, t: -this.t })
      this.collectMessage(res)
    },
    // 收藏歌单
    async collectPlaylist() {
      const res = await collectPlaylist({
        id: this.id,
        t: -this.t,
      })
      // if (res.code !== 200) return
      // if (this.t == 1) {
      // const cancel = this.userPlaylists.some((list) => {
      // return list.id == this.id
      // })
      // if (cancel) {
      // }
      // console.log(cancel)
      // }
      this.collectMessage(res)
    },
    // 收藏歌手
    async collectArtist() {
      {
        const res = await collectArtist({
          id: this.id,
          t: -this.t,
        })
        // if (res.code !== 200) return

        this.collectMessage(res)
      }
    },
    // 收藏专辑
    async collectAlbum() {
      const res = await collectAlbum({
        id: this.id,
        t: -this.t,
      })
      this.collectMessage(res)
    },
    // 收藏电台
    async collectDj() {
      const res = await collectDj({
        rid: this.id,
        t: -this.t,
      })
      this.collectMessage(res)
    },
    // 判断歌单是否收藏
    async getPlaylistIsCollect() {
      const res = await getPlaylist(this.$store.state.uid)
      if (res.code !== 200) return
      this.iconShow = res.playlist.some((item) => {
        return item.id == this.id
      })
      if (this.iconShow) this.t = 1
      else this.t = -1
    },
    // 判断mv和视频是否收藏
    async getMediaSubList() {
      const res = await getMediaSubList()
      if (res.code !== 200) return
      this.iconShow = res.data.some((item) => {
        return item.vid == this.id
      })
      if (this.iconShow) this.t = 1
      else this.t = -1
    },
    // 判断歌手是否收藏
    async getArtistSubList() {
      const res = await getArtistSubList()
      if (res.code !== 200) return
      this.iconShow = res.data.some((item) => {
        return item.id == this.id
      })
      if (this.iconShow) this.t = 1
      else this.t = -1
    },
    // 判断专辑是否收藏
    async getAlbumDetailDynamic() {
      const res = await getAlbumDetailDynamic(this.id)
      if (res.code !== 200) return
      this.iconShow = res.isSub
      if (this.iconShow) this.t = 1
      else this.t = -1
    },
    // 判断电台是否收藏
    async getDjSubList() {
      const res = await getDjSubList()
      if (res.code !== 200) return
      this.iconShow = res.djRadios.some((item) => {
        return item.id == this.id
      })
      if (this.iconShow) this.t = 1
      else this.t = -1
    },
  },
}
</script>

<style lang="less" scoped></style>
