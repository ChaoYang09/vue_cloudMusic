<template>
  <video
    autoplay
    src="http://vodkgeyttp9.vod.126.net/vodkgeyttp8/bK96iJBE_2666694525_shd.mp4?ts=1666065377&rid=80E22906E210C96DE62457F83D45C441&rl=3&rs=ftoMFfRiYgCwNcEyYUQyryBawXzeSxlu&sign=a2e34ff531adab2797e86145f68fb6c3&ext=I5YyZL03cdJT3M%2Bn7mU%2BABnVO6Rllsm%2BMkyDY700tK0QQlcnCokPUN%2BcBccW3eR19BQ%2BTCXtWWAhv8TDgTckfaCq2z1SC2lMqwnYCfFWlpdEjV6HgzcZWIyhAT699QXdJHPJ5RIvvXmRy6TiObU27RXG3JFAGXWKXk5uJRkdXwwRLNeaICFFSMx2y8qNUaSOxJIU%2B6LJhHqEzHbpY7d0Sf2hVS9b7xBEXLfsrnt6%2FIuorsAU4xNqVQJAa9TXbeGS"
    controls="controls"
  ></video>
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
  mounted() {},
  watch: {},
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
