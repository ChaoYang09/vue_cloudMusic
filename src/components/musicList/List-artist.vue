<template>
  <span>
    <span class="artist-list" v-for="(item, i) in scope.row.ar" :key="i">
      <span class="pointer deep-gray" @click="common.toArtistOrDj(item)">{{
        item.name
      }}</span>
    </span></span
  >
</template>

<script>
export default {
  props: {
    scope: {
      require: true,
    },
  },
  methods: {},
}
</script>

<style lang="less" scoped>
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
