<template>
  <el-container>
    <el-main>
      <div class="header over-flow">
        <div class="left">
          <img :src="playListInfo.coverImgUrl" alt="" />
        </div>
        <div class="right">
          <h2>{{ playListInfo.name }}</h2>
          <el-button type="danger" round icon="el-icon-caret-right" size="mini"
            >播放全部</el-button
          >
          <span>标签 : {{ tags }}</span>
          <span>播放 : {{ playListInfo.playCount }}</span>
          <span>简介 : {{ playListInfo.description }}</span>
        </div>
        <!-- <div class="clear"></div> -->
      </div>
      <div class="bottom">
        <el-table :data="songsList" stripe style="width: 100%">
          <el-table-column type="index" label="#" align="center">
          </el-table-column>

          <el-table-column prop="al.name" label="音乐标题" width="400px">
          </el-table-column>
          <el-table-column
            prop="ar[0].name"
            label="歌手"
            @click="toPlayer(val)"
          >
            <template v-slot="scope">
              <router-link
                class="router-link-active"
                :to="{
                  path: '/player',
                  query: {
                    id: scope.row.ar[0].id,
                  },
                }"
                >{{ scope.row.ar[0].name }}</router-link
              >
            </template>
          </el-table-column>
          <el-table-column prop="name" label="专辑"> </el-table-column>
          <el-table-column prop="" label="时长">
            <template v-slot="scope">
              {{ scope.row.dt | timeFormat }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      playListInfo: {},
      songsList: [],
    }
  },
  computed: {
    tags() {
      return this.playListInfo.tags
    },
  },
  created() {
    // console.log()
    this.playListInfo = this.$route.query.item
    // console.log(this.playListInfo)
    this.getSongsList()
  },
  methods: {
    async getSongsList() {
      const { data: res } = await this.$http.get('/playlist/track/all', {
        params: {
          id: this.playListInfo.id,
        },
      })
      this.songsList = res.songs
      // console.log(this.songsList)
    },
    toPlayer() {
      console.log('1')
      this.$router.push({
        path: '/player',
        query: {
          item,
        },
      })
    },
  },
}
</script>

<style lang="less" scoped>
.header {
  float: left;
  width: 1000px;
  // height: 200px;
  // background-color: burlywood;
  .left {
    float: left;
    // background-color: aquamarine;
    width: 150px;
    height: 150px;
    img {
      border-radius: 5px;
      width: 100%;
      height: 100%;
    }
  }
  .right {
    float: left;
    margin-left: 20px;
    width: 800px;
    height: 200px;
    // background-color: antiquewhite;
    span {
      display: block;
      margin: 5px;
      font-size: 14px;
      color: rgb(99, 97, 97);
    }
    .el-button {
      // font-size: 14px;
      margin: 11px 5px;
    }
  }
}
// .router-link-active {
//   text-decoration: none;
//   color: #606266;
// }
</style>
