<template>
  <span class="button-collect">
    <button class="btn">收藏(1444)</button>
    <svg class="icon icon-collect" aria-hidden="true" v-if="iconShow">
      <use xlink:href="#icon-Collections"></use>
    </svg>
    <svg class="icon icon-collect" aria-hidden="true" v-else>
      <use xlink:href="#icon-yitianjia"></use>
    </svg>
  </span>
</template>

<script>
export default {
  data() {
    return {
      iconShow: true,
    }
  },
}
</script>

<style lang="less" scoped>
.button-collect {
  // margin-right: 15px;
  display: inline-block;
  position: relative;
  .icon-collect {
    position: absolute;
    top: 6px;
    left: 15px;
  }
  .btn {
    cursor: pointer;
    height: 32px;
    width: 130px;
    border-radius: 15px;
    background-color: #ffffff;
    border: 1px solid #ccc;
    font-size: 15px;
    padding-left: 30px;
    // padding-right: 20px;
  }
  .btn:hover {
    color: black;
    background-color: #f2f2f2;
  }
}
</style>
