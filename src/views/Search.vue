<template>
  <div class="mainBox">
    <header>
      <h2>找到 {{ songCount }} 首单曲</h2>
    </header>
    <main>
      <el-table :data="songs" stripe size="mini">
        <el-table-column
          align="center"
          type="index"
          width="40"
          :formatter="formatterIndex"
          class-name="color-gray"
        >
        </el-table-column>
        <el-table-column width="40"
          ><svg class="icon gray icon-love" aria-hidden="true">
            <use xlink:href="#icon-love1"></use></svg
        ></el-table-column>

        <el-table-column min-width="350" label="音乐标题" prop="name">
        </el-table-column>
        <el-table-column
          min-width="150"
          label="歌手"
          class-name="color-gray-deeper "
        >
          <template v-slot="scope">
            {{ scope.row.ar[0].name }}
          </template>
        </el-table-column>
        <el-table-column
          min-width="200"
          label="专辑"
          prop="al.name"
          show-overflow-tooltip
          class-name="color-gray-deeper "
        ></el-table-column>
        <el-table-column label="时长" class-name="color-gray ">
          <template v-slot="scope">
            {{ scope.row.dt | timeFormat }}
          </template>
        </el-table-column>
        <el-table-column label="热度">
          <template v-slot="scope">
            <el-progress
              :percentage="scope.row.pop"
              :color="'#c8c8c8'"
              :show-text="false"
            ></el-progress>
          </template>
        </el-table-column>
      </el-table>
    </main>
    <footer>
      <el-pagination background layout="prev, pager, next" :total="1000">
      </el-pagination>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      songs: [], //单曲
      songCount: null, //单曲数量
    }
  },
  computed: {},
  created() {
    // console.log()
    this.getSongsList()
  },
  methods: {
    async getSongsList() {
      const { data: res } = await this.$http.get('/cloudsearch', {
        params: {
          keywords: this.$route.params.keywords,
        },
      })
      this.songs = res.result.songs
      this.songCount = res.result.songCount
    },
    formatterIndex(index) {
      // console.log(row)
      if (index < 10) {
        return '0' + index
      }
    },
    formatterName(row) {
      return row.ar[0].name + '1'
    },
  },
}
</script>

<style lang="less" scoped>
header {
  padding: 30px;
}
main {
  // width: 100%;
  .icon-love {
    // color: #fff;
    margin-top: 5px;
    font-size: 12px;
    cursor: pointer;
  }
  .icon-love:hover {
    color: #000000;
  }
}
footer {
}
.mainBox {
  width: 100%;
}
/deep/.color-gray {
  color: #969697;
}
/deep/.color-gray-deeper {
  color: #656565;
  cursor: pointer;
}
/deep/.color-gray-deeper:hover {
  color: #000000;
}
</style>
