<template>
  <!-- 搜索框区域 -->
  <div class="searchList-wrap">
    <input
      type="text"
      class="search-input"
      placeholder="搜索歌单音乐"
      v-model.trim="searchInput"
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
  props: {
    lists: {
      type: Array,
      require: true,
      default: () => [{}],
    },
  },
  data() {
    return {
      searchInput: '', //搜索框
      isShow: true,
      initLists: [],
    }
  },
  created() {},
  watch: {
    lists(newVal) {
      // if (this.initLists.length !== 0) return
      // else
      this.initLists = newVal
    },
    searchInput() {
      if (this.searchInput === '') {
        this.isShow = true
        this.$emit('initLists')
      } else {
        this.isShow = false
        const reg1 = /[^0-9a-zA-Z\u4e00-\u9fa5]/
        if (reg1.test(this.searchInput)) return (this.searchInput = '')
        // this.lists = this.subLists
        const reg = eval('/' + this.searchInput + '/i')

        // console.log(reg)
        let newLists = this.initLists.filter((item) => {
          const msg = `${item.name}${
            item.alia.length !== 0 ? item.alia[0] : ''
          }${item.tns ? item.tns[0] : ''}${item.ar
            .map((obj) => {
              return obj.name
            })
            .join('')}${item.al.name}`
          // console.log(typeof msg)
          if (reg.test(msg)) return item
        })
        // console.log(newArr)
        this.$emit('getNewLists', newLists)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.searchList-wrap {
  .search-input {
    position: relative;
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
