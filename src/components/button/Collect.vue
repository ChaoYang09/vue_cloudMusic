<template>
  <span class="button-wrap btn">
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
      <span v-show="subCounts !== 0">({{ subCounts | playCountFormat }})</span>
      <!-- {{ subCount }} -->
    </span>
  </span>
</template>

<script>
import { getMediaSubList } from '@/api/mv'
import { getArtistSubList, collectArtist } from '@/api/artist'
import { getPlaylist } from '@/api/user'
export default {
  props: ['subCount', 'id', 'type'],
  data() {
    return {
      iconShow: null,
      t: null,
      subCounts: this.subCount,
    }
  },
  created() {
    if (this.type === 'video' || this.type === 'mv') this.getMediaSubList()
    else if (this.type === 'playlist') this.getPlaylistIsCollect()
    else if (this.type === 'artist') {
      this.getArtistSubList()
    }
  },
  watch: {
    subCount(newVal) {
      this.subCounts = newVal
    },
  },

  methods: {
    // 点击收藏按钮 进行收藏和取消收藏操作
    async handleCollect() {
      if (this.type === 'video') this.collectVideo()
      else if (this.type === 'mv') this.collectMv()
      else if (this.type === 'playlist') this.collectPlaylist()
      else if (this.type === 'artist') this.collectArtist()
    },
    // 收藏视频
    async collectVideo() {
      {
        const { data: res } = await this.$http.get('/video/sub', {
          params: {
            id: this.id,
            t: -this.t,
          },
        })
        if (res.code !== 200) return this.$message.error('取消收藏失败')
        this.$message.success(res.message)
        if (res.message === '取消收藏成功') {
          this.iconShow = false
          this.t = -1
          this.subCounts--
        }
        if (res.message === '收藏成功') {
          this.iconShow = true
          this.t = 1
          this.subCounts++
        }
        // console.log(res)
      }
    },
    // 收藏MV
    async collectMv() {
      {
        const { data: res } = await this.$http.get('/mv/sub', {
          params: {
            mvid: this.id,
            t: -this.t,
          },
        })
        if (res.code !== 200) return this.$message.error('取消收藏失败')
        this.$message.success(res.message)
        if (res.message === '取消收藏成功') {
          this.iconShow = false
          this.t = -1
          this.subCounts--
        }
        if (res.message === '收藏成功') {
          this.iconShow = true
          this.t = 1
          this.subCounts++
        }
        // console.log(res)
      }
    },
    // 收藏歌单
    async collectPlaylist() {
      {
        const { data: res } = await this.$http.get('/playlist/subscribe', {
          params: {
            id: this.id,
            t: -this.t,
          },
        })
        if (res.code !== 200) return this.$message.error('收藏操作失败')

        if (this.t === 1) {
          this.$message.success('取消收藏成功')
          this.iconShow = false
          this.t = -1
          this.subCounts--
        } else if (this.t === -1) {
          this.$message.success('收藏成功')
          this.iconShow = true
          this.t = 1
          this.subCounts++
        }
        // console.log(res)
      }
    },
    // 收藏歌手
    async collectArtist() {
      {
        const res = await collectArtist({
          id: this.id,
          t: -this.t,
        })
        if (res.code !== 200) return this.$message.error('收藏操作失败')

        if (this.t === 1) {
          this.$message.success('取消收藏成功')
          this.iconShow = false
          this.t = -1
          // this.subCounts--
        } else if (this.t === -1) {
          this.$message.success('收藏成功')
          this.iconShow = true
          this.t = 1
          // this.subCounts++
        }
      }
    },
    // 判断歌单是否收藏
    async getPlaylistIsCollect() {
      const res = await getPlaylist(297835213)
      this.iconShow = res.playlist.some((item) => {
        return item.id == this.id
      })
      if (this.iconShow) this.t = 1
      else this.t = -1
    },
    // 判断mv和视频是否收藏
    async getMediaSubList() {
      const res = await getMediaSubList()
      this.iconShow = res.data.some((item) => {
        return item.vid === this.id
      })
      if (this.iconShow) this.t = 1
      else this.t = -1
    },
    // 判断歌手是否收藏
    async getArtistSubList() {
      const res = await getArtistSubList()
      this.iconShow = res.data.some((item) => {
        return item.id == this.id
      })
      if (this.iconShow) this.t = 1
      else this.t = -1
    },
  },
}
</script>

<style lang="less" scoped></style>
