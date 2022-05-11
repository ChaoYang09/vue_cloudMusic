<template>
  <div>
    <span
      :class="{
        default: true,
        'netEase-red': scope.row.id === $store.state.music.id,
      }"
      >{{ scope.row.name }}</span
    >

    <span class="gray default" v-if="(scope.row.alia || []).length !== 0">
      &nbsp;({{ scope.row.alia[0] }})</span
    >
    <span class="gray default" v-if="(scope.row.tns || []).length !== 0">
      &nbsp;({{ scope.row.tns[0] }})</span
    >
    <!-- VIP -->
    <span
      style="position: relative; top: 1px"
      class="ml-5 default"
      v-if="scope.row.fee === 1"
      ><Label :small="true" :color="'#fe672e'">VIP</Label></span
    >
    <!-- SQ -->
    <span
      style="position: relative; top: 1px"
      class="ml-5 default"
      v-if="scope.row.sq !== null"
      ><Label :small="true">SQ</Label></span
    >
    <!-- mv -->
    <span
      style="position: relative; top: 1px"
      class="ml-5 pointer position"
      v-if="scope.row.mv !== 0"
      ><Label :small="true" @click.native="common.toVideoPlayer(scope.row.mv)"
        >MV &nbsp;
        <svg class="icon icon-triangle" aria-hidden="true">
          <use xlink:href="#icon-triangle1-copy" /></svg></Label
    ></span>
  </div>
</template>

<script>
import Label from '@/components/label/Label.vue'
export default {
  components: {
    Label,
  },
  props: {
    scope: {
      require: true,
      default: () => ({}),
    },
  },
}
</script>

<style>
.icon-triangle {
  position: absolute;
  right: 1px;
  top: 2px;
  font-size: 5px;
}
</style>
