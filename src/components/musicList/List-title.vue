<template>
  <div :class="{ 'music-title-wrap': true }">
    <div
      :class="{
        'hidden-1': true,
        'inline-block': true,
        default: true,
        'netEase-red': scope.row.id === $store.state.music.id,
      }"
      ref="nameRef"
    >
      {{ scope.row.name }}
    </div>
    <!-- extra-wrap -->
    <div class="extra-wrap hidden-1" ref="extraRef" v-show="isExtraShow">
      <span
        class="gray default"
        v-if="(scope.row.alia || []).length !== 0"
        ref="aliaRef"
      >
        &nbsp;( {{ scope.row.alia[0] }} )</span
      >
      <span
        class="gray default"
        v-if="(scope.row.tns || []).length !== 0"
        ref="tnsRef"
      >
        &nbsp;( {{ scope.row.tns[0] }} )</span
      >
    </div>

    <div class="label-wrap" ref="labelRef">
      <!-- VIP -->
      <span
        style="top: 1px"
        class="ml-5 position default"
        v-if="scope.row.fee === 1"
        ><Label :small="true" :color="'#fe672e'">VIP</Label></span
      >
      <!-- SQ -->
      <span
        style="top: 1px"
        class="ml-5 position default inline-block"
        v-if="scope.row.sq !== null"
        ><Label :small="true">SQ</Label></span
      >
      <!-- mv -->
      <span
        style="position: relative; top: 1px"
        class="ml-5 pointer position"
        v-if="scope.row.mv !== 0"
      >
        <Label :small="true" @click.native="common.toVideoPlayer(scope.row.mv)"
          >MV &nbsp;
          <svg class="icon icon-triangle" aria-hidden="true">
            <use xlink:href="#icon-triangle1-copy" /></svg></Label
      ></span>

      <!-- 节目 -->
      <span
        style="top: 1px"
        class="ml-5 position default"
        v-if="scope.row.djId !== 0"
        ><Label :small="true" :color="'#999999'">节目</Label></span
      >
    </div>
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
  data() {
    return {
      isFlex: false,
      isHidden: false,
      subScope: this.scope,
      width: null,
      name: null,
      extra: null,
      subExtra: 0,
      label: null,
      isExtraShow: true,
      id: +new Date(),
    }
  },
  mounted() {
    // console.log(this.scope)
    this.width = this.scope.column.realWidth
    if (this.width < 200) this.isExtraShow = false
    // console.log(this.scope.$index, this.subExtra)
    // this.$nextTick(() => {
    // this.calcExtraWidth()
    // })
    // setTimeout(() => {
    // this.name = this.$refs.nameRef.offsetWidth
    // console.log(this.scope.$index + ' ~~~~~' + this.$refs.nameRef.offsetWidth)
    // }, 0)
  },
  created() {
    // console.log(this.subScope)
  },
  watch: {
    'scope.column.realWidth'(newVal) {
      // this.width = newVal
      // this.$nextTick(() => {
      //   this.calcExtraWidth()
      // })
    },

    '$store.state.page'() {
      // console.log(111111111)
      // this.subExtra = 0
      // setTimeout(() => {
      // this.$nextTick(() => {
      //   this.id = +new Date()
      //   this.calcExtraWidth()
      // })
      // }, 2000)
      // document.body.scrollTop = 0
      // chrome
      const currentY =
        document.documentElement.scrollTop || document.body.scrollTop
      this.common.scrollAnimation(currentY, 0)
      // document.body.scrollTop = 0
      // firefox
      // document.documentElement.scrollTop = 0
      // safari
      // window.pageYOffset = 0
    },
  },

  methods: {
    calcExtraWidth() {
      // this.$nextTick(() => {
      // setTimeout(() => {
      // console.log(this.width)

      this.name = this.$refs.nameRef.offsetWidth
      console.log(this.scope.$index + ' ~~~~~' + this.name)
      if (this.subExtra == 0) {
        this.subExtra = this.$refs.extraRef.offsetWidth
      }
      this.label = this.$refs.labelRef.offsetWidth
      this.extra = this.$refs.extraRef.offsetWidth
      const sum = this.name + this.extra + this.label
      const sum1 = this.name + this.subExtra + this.label
      // if (this.extra > 0) {
      const extraWidth = this.width - (20 + this.name + this.label)
      // 先考虑name和标签的显示
      if (this.name + this.label > this.width - 20) {
        this.$refs.nameRef.style.width = this.width - this.label - 25 + 'px'
        this.isHidden = true
        // this.isFlex = true
      }

      // width从大变小
      // if (sum >= this.width - 20) {
      //   if (extraWidth < 0) {
      //     this.$refs.extraRef.style.width = 0 + 'px'
      //   } else {
      //     this.$refs.extraRef.style.width = extraWidth + 'px'
      //   }
      // }
      // // width从小变大
      // else {
      //   if (sum1 <= this.width - 20) {
      //     this.$refs.extraRef.style.width = this.subExtra + 1 + 'px'
      //   } else {
      //     this.$refs.extraRef.style.width = extraWidth + 'px'
      //   }
      // }
      // } else {
      //   const nameWidth = this.width - (20 + this.label)
      //   if (sum >= this.width - 20) {
      //     // this.$refs.extraRef.style.width = 0 + 'px'
      //     this.$refs.nameRef.style.width = nameWidth + 'px'
      //   }
      // }

      // if (this.scope.row.alia.length !== 0 || this.scope.row.tns)
      //  {

      // this.isFlex = true
      // }
      // else {
      // this.$refs.extraRef.style.width = 0 + 'px'
    },
    // }, 1000)
    // })
  },
  // },
}
</script>

<style>
.music-title-wrap {
  /* width: 250px; */
  display: flex;
}

.extra-wrap {
  /* position: relative; */
  /* left: 2px; */
  /* vertical-align: top; */
  /* display: inline-block; */
}
.label-wrap {
  /* display: inline-block; */
}
.icon-triangle {
  position: absolute;
  right: 1px;
  top: 2px;
  font-size: 5px;
}
</style>
