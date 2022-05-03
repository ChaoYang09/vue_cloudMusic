<template>
  <span class="block" style="margin-left: -10px">
    <svg
      :class="{
        icon: true,
        'icon-love': true,
        'align-center': true,
        'like-love': scope.row.like,
      }"
      aria-hidden="true"
      @click="likeMusic(scope.row, scope.$index)"
    >
      <use xlink:href="#icon-icon_love_hover" />
    </svg>
  </span>
</template>

<script>
export default {
  props: {
    scope: {
      require: true,
    },
  },
}
</script>

<style>
.icon-love {
  color: #c2c1c1;
  cursor: pointer;
}

.like-love {
  color: #ec4141;
}
</style>
