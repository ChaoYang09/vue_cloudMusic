<template>
  <div id="app">
    <!-- <el-card><div class="donut"></div></el-card> -->
    <router-view></router-view>
  </div>
</template>
<script>
export default {}
</script>
<style lang="less">
::-webkit-scrollbar {
  /*滚动条整体样式*/

  width: 7px; /*高宽分别对应横竖滚动条的尺寸*/

  height: 1px;
}

::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/

  border-radius: 10px;

  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);

  background: #c2bfbf;
}

::-webkit-scrollbar-track {
  /*滚动条里面轨道*/

  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);

  border-radius: 10px;

  background: #ededed;
}

// @keyframes donut-spin {
//   0% {
//     transform: rotate(0deg);
//   }
//   100% {
//     transform: rotate(360deg);
//   }
// }

// .donut {
//   display: inline-block;
//   border: 4px solid rgba(0, 0, 0, 0.1);
//   border-left-color: #7983ff;
//   border-radius: 50%;
//   width: 30px;
//   height: 30px;
//   animation: donut-spin 1.2s linear infinite;
// }
</style>
