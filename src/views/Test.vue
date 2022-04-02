<template>
  <div class="father">
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-iov-pre"></use>
    </svg>

    <div ref="wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
// type="text/ecmascript-6"
import BScroll from 'better-scroll'
import MouseWheel from '@better-scroll/mouse-wheel'
import ScrollBar from '@better-scroll/scroll-bar'

BScroll.use(ScrollBar)
BScroll.use(MouseWheel)

export default {
  props: {
    data: {
      type: Array,
      default: null,
    },
  },
  mounted() {
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: 3,

        mouseWheel: true,
        // {
        //   speed: 20,
        //   invert: false,
        //   easeTime: 300,
        // },
        scrollY: true,
        scrollbar: true,
      })
    },
  },
  watch: {
    data() {
      setTimeout(() => {
        this.refresh()
      }, this.refreshDelay)
    },
  },
}
</script>

<style lang="less" scoped>
.aa {
  width: 100px;
  height: 100px;
  color: antiquewhite;
}
.icon {
  width: 2em;
  height: 2em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
