<template>
  <!-- 推荐歌单 -->
  <div class="cover-content">
    <div
      class="playlist"
      @mouseenter="playShow = i"
      @mouseleave="playShow = null"
    >
      <div class="img-wrap position">
        <img class="rounded-5" v-lazy="url" alt="" />
        <transition name="fade">
          <span class="play-svg" v-show="playShow === i">
            <svg class="icon icon-play" aria-hidden="true">
              <use xlink:href="#icon-play"></use></svg
          ></span>
        </transition>
      </div>

      <!-- 歌曲标题 -->
      <span class="cover-name hidden-2 position">{{ name }} </span>
      <!-- user里的歌曲数量占位 -->
      <slot />
      <!-- 播放数量 -->
      <span class="cover-count">
        <svg class="icon icon-right-triangle" aria-hidden="true">
          <use xlink:href="#icon-triangle"></use></svg
        >{{ count | playCountFormat }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      require: true,
    },
    url: {
      type: String,
      require: true,
    },
    count: {
      type: [Number, String],
      require: true,
    },
    i: {
      require: true,
    },
  },
  data() {
    return {
      playShow: null,
    }
  },
}
</script>
<style lang="less" scoped>
.playlist {
  margin: 5px 0;
  position: relative;
  cursor: pointer;
  .cover-name {
    margin: 5px 0;
    display: block;
    width: 100%;
  }
  .play-svg {
    position: absolute;
    font-size: 11px;
    right: 10px;
    bottom: 10px;
    color: #ec4141;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #ebebed;
    .icon-play {
      margin-left: 3px;
    }
  }
  .cover-count {
    display: flex;
    align-items: center;
    position: absolute;
    color: #fff;
    top: 5px;
    right: 8px;
    font-size: 12px;
  }
}
</style>
