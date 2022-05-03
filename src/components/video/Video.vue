<template>
  <div class="video-content">
    <div class="position">
      <img class="rounded-5" :src="url" alt="" />
      <span class="durations" v-if="duration !== 0">{{
        duration | timeFormat
      }}</span>
      <span class="count">
        <svg class="icon icon-right-triangle" aria-hidden="true">
          <use xlink:href="#icon-triangle"></use></svg
        >{{ count | playCountFormat }}</span
      >
    </div>

    <span class="overHidden block my-5">
      <slot />
      {{ name }}</span
    >
    <slot name="author"></slot>
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
    duration: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    // creators() {
    //   const arr = []
    //   this.creator.forEach((item) => {
    //     arr.push(item.userName)
    //   })
    //   return arr.join(' / ')
    // },
  },
}
</script>

<style lang="less" scoped>
.video-content {
  margin: 10px 0;
  // position: relative;
  cursor: pointer;
  .count {
    display: flex;
    align-items: center;
    position: absolute;
    color: #fff;
    top: 2px;
    right: 6px;
    font-size: 12px;
  }
  .durations {
    font-size: 12px;
    color: #ffffff;
    position: absolute;
    bottom: 8px;
    right: 8px;
  }
}
.artist-list {
  &::after {
    display: inline;
    margin: 5px;
    content: '/';
  }
  &:last-child::after {
    content: '';
  }
}
</style>
