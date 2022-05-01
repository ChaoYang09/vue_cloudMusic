<template>
  <div class="video-wrap">
    <img class="rounded-5" :src="video.coverUrl" alt="" />
    <span class="overHidden">{{ video.title }}</span>
    <span class="light-gray">by {{ video.creator.nickname }}</span>
    <span class="count">
      <svg class="icon icon-right-triangle" aria-hidden="true">
        <use xlink:href="#icon-triangle"></use></svg
      >{{ video.playTime | playCountFormat }}</span
    >
    <span class="durations">{{ video.durationms | timeFormat }}</span>
  </div>
</template>
<script>
export default {
  props: {
    video: {
      type: Object,
      require: true,
    },
  },
}
</script>

<style lang="less" scoped>
.video-wrap {
  margin: 5px 0;
  position: relative;
  cursor: pointer;
  .count {
    display: flex;
    align-items: center;
    position: absolute;
    color: #fff;
    top: 0px;
    right: 8px;
    font-size: 12px;
  }
  .durations {
    font-size: 12px;
    color: #ffffff;
    position: absolute;
    bottom: 50px;
    right: 8px;
  }
}
</style>
