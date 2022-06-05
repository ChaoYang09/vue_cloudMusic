<template>
  <span class="block" style="margin-left: -10px">
    <svg
      :class="{
        icon: true,
        'icon-love': true,
        'align-center': true,
        'like-love': scope.like,
      }"
      aria-hidden="true"
      @click="likeMusic(scope)"
    >
      <use xlink:href="#icon-icon_love_hover" />
    </svg>
  </span>
</template>

<script>
import { likeMusic } from '@/api/music'

export default {
  props: {
    scope: {
      require: true,
    },
  },
  methods: {
    // 收藏音乐
    async likeMusic(row) {
      if (!this.$store.state.isLogin)
        return this.$store.commit('setLoginVisible', true)
      // console.log(index)
      // let isLike = this.likeList.includes(row.id)
      const res = await likeMusic({
        id: row.id,
        like: !row.like,
      })
      if (res.code !== 200) return this.$message.error('收藏失败')
      if (!row.like) {
        let newIds = this.$store.state.likeIds
        newIds.unshift(row.id)
        this.$store.commit('setLikeIds', newIds)
        row.like = true
        // this.$set(this.songs, index, row)
        this.$message.success('已添加到我喜欢的音乐')
      } else {
        let newIds = this.$store.state.likeIds
        newIds.splice(newIds.indexOf(row.id), 1)
        this.$store.commit('setLikeIds', newIds)
        row.like = false
        // this.$set(this.songs, index, row)
        this.$message('取消喜欢成功')
      }
    },
  },
}
</script>

<style>
.icon-love {
  color: #c2c1c1;
  cursor: pointer;
}

.like-love {
  color: #ec4141;
}
</style>
