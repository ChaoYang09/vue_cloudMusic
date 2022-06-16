<template>
  <div class="daily-wrap">
    <header class="default">
      <div class="calendar-wrap position">
        <svg class="icon icon-calendar netEase-red" aria-hidden="true">
          <use xlink:href="#icon-aui-icon-calendar"></use>
        </svg>
        <span class="day">{{ day }}</span>
      </div>
      <div>
        <div class="font-20 bold">每日歌曲推荐</div>
        <div class="font-12 mt-5 deeper-gray">
          根据你的音乐口味生成,每天6:00更新
        </div>
      </div>
    </header>
    <!-- 按钮区域 -->
    <main class="ml-30 mb-10">
      <!-- 播放全部 -->
      <Play-Button
        class="mr-10"
        ref="playBtnRef"
        @click.native="PlayAllSongs"
      ></Play-Button>
    </main>

    <footer>
      <Music-List :songs="dailySongs"> </Music-List>
    </footer>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import { getDailySongs } from '@/api/user'
import PlayButton from '@/components/button/Play-Button.vue'
import MusicList from '@/components/musicList/MusicList.vue'
export default {
  components: {
    PlayButton,
    MusicList,
  },
  data() {
    return {
      day: 0,
      dailySongs: [],
    }
  },
  computed: {
    ...mapState(['likeIds', 'isLogin']),
  },
  watch: {
    likeIds() {
      this.dailySongs.forEach((item) => {
        item.like = this.likeIds.includes(item.id)
      })
    },
  },
  created() {
    this.getCurrentDay()
    this.getDailySongs()
  },
  methods: {
    ...mapMutations(['upDataLikeState']),

    async getDailySongs() {
      const res = await getDailySongs()
      if (res.code !== 200) return

      // console.log(res)
      if (this.$store.state.isLogin)
        res.data.dailySongs.forEach((item) => {
          item.like = this.$store.state.likeIds.includes(item.id)
        })

      this.dailySongs = res.data.dailySongs
    },

    // 获取今天的day
    getCurrentDay() {
      const date = new Date()
      const day = date.getDate()
      this.day = day
    },
    PlayAllSongs() {
      this.$refs.playBtnRef.PlayFirstSong(this.dailySongs)
    },
  },
}
</script>

<style lang="less" scoped>
.daily-wrap {
  width: 100%;
  header {
    display: flex;
    align-items: center;
    padding: 10px;
    // margin: -18px 0 0 -19px;
    .calendar-wrap {
      .day {
        position: absolute;
        top: 60%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 40px;
        font-weight: bold;
        color: #ec4141;
      }
      .icon-calendar {
        width: 120px;
        height: 120px;
        font-weight: 400;
      }
    }
  }
}
</style>
