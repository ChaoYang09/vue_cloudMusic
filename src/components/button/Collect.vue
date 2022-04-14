<template>
  <span class="button-collect">
    <button class="btn">
      <span v-if="iconShow">已</span>收藏({{ subCount }})
    </button>
    <!-- 已收藏 -->
    <svg class="icon icon-collect" aria-hidden="true" v-if="iconShow">
      <use xlink:href="#icon-yitianjia"></use>
    </svg>
    <!-- 收藏 -->
    <svg class="icon icon-collect" aria-hidden="true" v-else>
      <use xlink:href="#icon-Collections"></use>
    </svg>

    <!-- {{ mvName }} -->
  </span>
</template>

<script>
export default {
  props: ['subCount', 'mvName', 'mvid'],
  data() {
    return {
      iconShow: null,
      t: null,
    }
  },
  mounted() {},

  methods: {
    // 点击收藏按钮 进行收藏和取消收藏操作

    async handleCollect() {
      if (this.iconShow) {
        this.t = 0
      } else {
        this.t = 1
      }
      console.log(this.t)
      const { data: res } = await this.$http.get('/mv/sub', {
        params: {
          mvid: this.mvid,
          t: this.t,
        },
      })
      this.getIsCollect()
      // if (res.code !== 200) this.$message.error('取消收藏失败')
      // this.$message.success('收藏成功')
      // this.iconShow = !this.iconShow
    },
    // 判断mv是否收藏
    async getIsCollect() {
      // console.log('1')
      // console.log(this.mvName)
      const { data: res } = await this.$http.get('/mv/sublist')
      this.iconShow = res.data.some((item) => {
        // console.log(item.title)
        return item.title === this.mvName
      })
      // console.log(this.iconShow)
    },
  },
  watch: {
    mvName() {
      this.getIsCollect()
    },
  },
}
</script>

<style lang="less" scoped>
.button-collect {
  // margin-right: 15px;
  display: inline-block;
  position: relative;
  .icon-collect {
    position: absolute;
    top: 6px;
    left: 15px;
  }
  .btn {
    cursor: pointer;
    height: 33px;
    // width: 140px;
    border-radius: 15px;
    background-color: #ffffff;
    border: 1px solid #ccc;
    font-size: 15px;
    padding-left: 40px;
    padding-right: 10px;
  }
  .btn:hover {
    color: black;
    background-color: #f2f2f2;
  }
}
</style>
