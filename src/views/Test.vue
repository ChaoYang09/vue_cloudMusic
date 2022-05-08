<template>
  <span class="sort-wrap">
    <span class="gray mr-10">排序</span>
    <div class="sort-content">
      <div class="sort" @click="a">
        <svg class="icon" aria-hidden="true" style="font-size: 10px">
          <use xlink:href="#icon-sort-desc"></use>
        </svg>
      </div>
      <div class="selected sort">
        <svg class="icon" aria-hidden="true" style="font-size: 10px">
          <use xlink:href="#icon-sort-asc"></use>
        </svg>
      </div>
    </div>
  </span>
</template>

<script>
export default {
  data() {
    return {}
  },

  methods: {
    a() {
      console.log(11111)
    },
  },
}
</script>

<style lang="less" scoped>
.sort-wrap {
  display: flex;
  align-items: baseline;
}
.sort-content {
  display: flex;
  border-radius: 3px;
  width: 50px;
  height: 20px;
  color: #919191;
  background-color: #f2f2f2;
  overflow: hidden;
  .sort {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .sort:hover {
    background-color: #e7e7e7;
  }
}
.selected {
  display: inline-block;
  width: 50%;
  color: #ffffff;
  background-color: #bfbfbf;
  height: 100%;
  pointer-events: none;
}
</style>
