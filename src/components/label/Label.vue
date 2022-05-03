<template>
  <span
    :class="{ label: true, large: large, small: small }"
    :style="{ color: color }"
    ><slot></slot
  ></span>
</template>

<script>
export default {
  props: {
    large: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: '#ec4141',
    },
  },
}
</script>

<style lang="less" scoped>
.label {
  display: inline-block;
  // color: #ec4141;
  text-align: center;
  border: 1px solid;
  border-radius: 2px;
}
.large {
  width: 33px;
  height: 17px;
  line-height: 17px;
}
.small {
  // width: 22px;
  padding: 0 1px;
  height: 12px;
  line-height: 12px;

  -webkit-transform: scale(0.9);
}
</style>
