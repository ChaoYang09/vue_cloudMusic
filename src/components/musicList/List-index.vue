<template>
  <!-- 序号 -->

  <span v-if="scope.row.id === $store.state.music.id">
    <svg
      class="icon netEase-red align-center center"
      aria-hidden="true"
      v-if="$store.state.playing"
    >
      <use xlink:href="#icon-volume-up-fill" />
    </svg>
    <svg
      class="icon netEase-red align-center center font-14"
      aria-hidden="true"
      v-else
    >
      <use xlink:href="#icon-md-volume-mute"></use>
    </svg>
  </span>
  <span class="light-gray" v-else>
    {{
              scope.$index + 1 + offset &lt; 10
                ? '0' + (scope.$index + 1 + offset)
                : scope.$index + 1 + offset
    }}
  </span>
</template>
<script>
export default {
  props: {
    offset: {
      type: [Number, String],
      require: true,
      default: 0,
    },
    scope: {},
  },
}
</script>

<style lang="less" scoped></style>
