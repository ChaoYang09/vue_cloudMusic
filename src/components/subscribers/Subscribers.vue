<template>
  <div class="subscribers-wrap">
    <div v-if="subscribers.length !== 0">
      <div
        class="subscribers-content pointer"
        v-for="(item, i) in subscribers"
        :key="i"
      >
        <img class="rounded-50 border-line" :src="item.avatarUrl" alt="" />
        <div class="info-wrap ml-10">
          <span class="nickname"
            >{{ item.nickname }}<Gender :gender="item.gender"></Gender
          ></span>
          <span
            class="block mt-10 overHidden font-12 block"
            style="width: 150px"
            >{{ item.signature }}</span
          >
        </div>
      </div>
    </div>
    <div v-else class="deeper-gray default" style="margin: 40px auto">
      暂无收藏者
    </div>
  </div>
</template>

<script>
import { getSubscribers } from '@/api/playlist'
import Gender from '@/components/gender/Gender.vue'
export default {
  props: {
    id: {
      type: [Number, String],
      require: true,
    },
  },
  components: {
    Gender,
  },
  data() {
    return {
      subscribers: [],
    }
  },
  created() {
    this.getSubscribers()
  },
  methods: {
    async getSubscribers() {
      const res = await getSubscribers(this.id)
      this.subscribers = res.subscribers
    },
  },
}
</script>

<style lang="less" scoped>
.subscribers-wrap {
  min-width: 750px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .subscribers-content {
    display: flex;
    align-items: center;
    width: 350px;
    height: 100px;
    img {
      width: 80px;
      height: 80px;
    }
    .nickname:hover {
      color: #000000;
    }
  }
}
</style>
