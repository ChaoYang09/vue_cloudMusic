<template>
  <div class="gender-wrap inline-block">
    <i v-if="gender === 1" class="el-icon-male"></i>
    <i v-if="gender === 2" class="el-icon-female"></i>
  </div>
</template>

<script>
export default {
  props: {
    gender: {
      type: [Number, String],
      require: true,
    },
  },
}
</script>

<style lang="less" scoped>
.el-icon-male {
  // font-size: 10px;
  box-sizing: border-box;
  margin: 10px 0 0 10px;
  padding: 2px;
  border-radius: 50%;
  background-color: #c0f3ff;
  color: #57b1db;
}
.el-icon-female {
  // font-size: 10px;
  box-sizing: border-box;
  margin: 10px 0 0 10px;
  padding: 2px;
  border-radius: 50%;
  background-color: #ffcde8;
  color: #d861c8;
}
</style>
