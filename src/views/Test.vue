<template>
  <!-- 搜索框区域 -->
  <div class="search-wrap">
    <input
      type="text"
      class="search-input"
      placeholder="搜索歌单音乐"
      v-model.trim="searchInput"
      ref="inputRef"
    />
    <!-- 搜索图标 -->
    <svg class="icon icon-search" aria-hidden="true" v-if="isShow">
      <use xlink:href="#icon-search"></use>
    </svg>
    <svg
      class="icon icon-close"
      aria-hidden="true"
      v-else
      @click="searchInput = ''"
    >
      <use xlink:href="#icon-close-bold"></use>
    </svg>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchInput: '', //搜索框
      isShow: true,
    }
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      console.log(this.$refs.inputRef.width)
    })
  },
  watch: {
    searchInput() {
      if (this.searchInput === '') this.isShow = true
      else this.isShow = false
    },
  },
}
</script>

<style lang="less" scoped>
.suggest-search {
  padding: 10px;
  // margin-bottom: 6px;
}

.search-wrap {
  position: relative;
  .search-input {
    width: 200px;
    height: 25px;
    border-radius: 15px;
    border: 1px solid #eee;
    outline: none;
    padding-left: 10px;
    background-color: #f7f7f7;
  }
  .search-input::placeholder {
    color: #c8c8d8;
    font-size: 12px;
  }
}
.icon-search {
  top: 3px;
  right: 10px;
  position: absolute;
}
.icon-close {
  font-size: 7px;
  top: 7px;
  right: 12px;
  position: absolute;
}
.icon-close:hover {
  color: rgb(118, 118, 118);
}
</style>
