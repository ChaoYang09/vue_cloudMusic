<template>
  <span class="btn-wrap btn btn-red">
    <span class="btn-content">
      <!-- 播放全部 -->
      <svg class="icon icon-play" aria-hidden="true">
        <use xlink:href="#icon-play"></use>
      </svg>
      <!-- {{ subCount }} -->
      播放全部
    </span>
  </span>
</template>

<script>
export default {
  props: {
    // lists: {
    //   type: Array,
    //   default: () => [{}],
    //   require: true,
    // },
  },
  methods: {
    // 点击播放全部 将数据渲染到playlist上面
    PlayFirstSong(lists) {
      // console.log(lists)
      this.common.playMusic(lists[0])
      // 将数据渲染到playlist上面
      lists.forEach((item, i) => {
        item.index = i
      })
      this.$store.commit('setPlaylist', lists)
    },
  },
}
</script>

<style lang="less" scoped>
.btn-wrap {
  // background-color: #ec4141;
  // color: #ffffff;
  .btn-content {
    .icon-play {
      font-size: 8px;
      color: #ffffff;
      margin-right: 3px;
    }
  }
}
</style>
