<template>
  <el-container>
    <el-main>
      <header>
        <img :src="playerDetail.artist.cover" alt="" />
        <div class="right">
          <h2>{{ playerDetail.artist.name }}</h2>
          <div class="btn">
            <el-button round size="small"
              ><i class="el-icon-folder-add"></i> 收藏</el-button
            ><el-button round size="small"
              ><i class="el-icon-user"></i> 个人主页</el-button
            >
          </div>

          <div>
            <span>单曲数 : {{ playerDetail.artist.musicSize }}</span
            ><span>专辑数 : {{ playerDetail.artist.albumSize }}</span
            ><span>MV数 : {{ playerDetail.artist.mvSize }}</span>
          </div>
        </div>
      </header>

      <footer>
        <img src="../assets/images/top50.png" alt="" />
        <el-table :data="hotSongs" stripe>
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="name" width="400px"></el-table-column>
          <el-table-column>
            <template v-slot="scope">
              {{ scope.row.dt | timeFormat }}
            </template></el-table-column
          >
        </el-table>
      </footer>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      playerDetail: {
        artist: {
          cover: '',
        },
      },

      hotSongs: [],
    }
  },
  created() {
    this.getPlayerDetail()
    this.getHotSongs()
  },
  methods: {
    async getPlayerDetail() {
      const { data: res } = await this.$http.get('/artist/detail', {
        params: {
          id: this.$route.query.id,
        },
      })
      this.playerDetail = res.data
      // this.cover = res.data.artist.cover
      // console.log(res)
    },
    // 获取歌手50首热歌
    async getHotSongs() {
      const { data: res } = await this.$http.get('/artist/top/song', {
        params: {
          id: this.$route.query.id,
        },
      })
      this.hotSongs = res.songs
      console.log(res)
    },
  },
}
</script>

<style lang="less" scoped>
header {
  display: flex;
  // justify-content: ;
  img {
    display: block;
    width: 200px;
    height: 200px;
    // background-color: antiquewhite;
    border-radius: 5px;
    margin-right: 30px;
    // overflow: hidden;
  }
  .right {
    min-width: 330px;
    height: 200px;
    // background-color: cadetblue;
    // .el-button {
    //   padding: 8px;
    //   font-size: 13px;
    // }
    .btn {
      margin: 10px 0;
      .el-icon-folder-add,
      .el-icon-user {
        font-size: 16px;
      }
    }
    span {
      margin-right: 30px;
    }
  }
}
footer {
  display: flex;
  margin-top: 60px;
  img {
    width: 150px;
    height: 150px;
    border-radius: 5px;
  }
  .el-table {
    margin-left: 60px;
  }
}
</style>
