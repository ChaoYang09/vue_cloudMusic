<template>
  <span class="button-wrap">
    <button class="btn-content">
      <!-- 播放全部 -->
      <svg class="icon icon-play" aria-hidden="true">
        <use xlink:href="#icon-play"></use>
      </svg>
      <!-- {{ subCount }} -->
      播放全部
    </button>
  </span>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.button-wrap {
  margin-top: 10px;
  display: inline-block;
  // position: relative;

  .btn-content {
    cursor: pointer;
    height: 33px;
    // width: 140px;
    border-radius: 15px;
    border: 1px solid #ccc;
    font-size: 14px;
    padding: 0 15px;
    background-color: #ec4141;
    color: #ffffff;
    display: flex;
    align-items: center;
    .icon-play {
      font-size: 8px;
      color: #ffffff;
      margin-right: 10px;
    }
  }
  .btn-content:hover {
    background-color: #cc3232;
  }
}
</style>
