<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
// type="text/ecmascript-6"
import { mapState } from 'vuex'
import BScroll from '@better-scroll/core'
import MouseWheel from '@better-scroll/mouse-wheel'
import ScrollBar from '@better-scroll/scroll-bar'

BScroll.use(ScrollBar)
BScroll.use(MouseWheel)
const DIRECTION_H = 'horizontal'
const DIRECTION_V = 'vertical'

export default {
  props: {
    probeType: {
      type: Number,
      default: 3,
    },
    click: {
      type: Boolean,
      default: false,
    },
    listenScroll: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: null,
    },
    pullup: {
      type: Boolean,
      default: false,
    },
    beforeScroll: {
      type: Boolean,
      default: false,
    },
    refreshDelay: {
      type: Number,
      default: 20,
    },
    direction: {
      type: String,
      default: DIRECTION_V,
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
        probeType: this.probeType,
        click: this.click,
        // eventPassthrough: this.direction === DIRECTION_V ? DIRECTION_H : DIRECTION_V,
        mouseWheel: true,
        scrollY: true,
        scrollbar: true,
      })

      if (this.listenScroll) {
        this.scroll.on('scroll', (pos) => {
          this.$emit('scroll', pos)
        })
      }
      if (this.pullup) {
        this.scroll.on('scrollEnd', () => {
          if (this.scroll.y <= this.scroll.maxScrollY + 50) {
            this.$emit('scrollToEnd')
          }
        })
      }

      if (this.beforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScroll')
        })
      }
    },
    disable() {
      this.scroll && this.scroll.disable()
    },
    enable() {
      this.scroll && this.scroll.enable()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    },
  },
  watch: {
    data() {
      setTimeout(() => {
        // console.log(this.data)
        this.refresh()
      }, this.refreshDelay)
    },
    isPlayerShow() {
      // console.log(111)
      // this.scroll.refresh()

      this.refresh()
    },
    playing() {
      // console.log('playing')
      // this.refresh()
    },
  },
  computed: {
    ...mapState(['isPlayerShow', 'playing']),
  },
}
</script>

<style lang="less" scoped></style>
