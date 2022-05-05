<template>
  <span class="btn-wrap btn">
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
export default {}
</script>

<style lang="less" scoped>
.btn-wrap {
  background-color: #ec4141;
  color: #ffffff;
  .btn-content {
    .icon-play {
      font-size: 8px;
      color: #ffffff;
      margin-right: 3px;
    }
  }
}
.btn-wrap:hover {
  background-color: #cc3232;
}
</style>
