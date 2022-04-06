<template>
  <div class="box">
    <header>
      <h2>我的电台</h2>
      <div>
        <span class="sub-tittle">我订阅的电台</span>

        <span class="gray">({{ djRadios.length }})</span>
      </div>
    </header>
    <footer>
      <el-table stripe :data="djRadios" style="width: 100%">
        <!-- picUrl -->
        <el-table-column width="120">
          <template v-slot="scope">
            <!-- {{ scope.row.avatarUrl }} -->
            <img class="img" :src="scope.row.picUrl" alt="" />
          </template>
        </el-table-column>

        <!-- name -->
        <el-table-column prop="name" width="500"> </el-table-column>

        <!-- nickname -->
        <el-table-column width="300">
          <template v-slot="scope"
            ><span class="gray">by {{ scope.row.dj.nickname }}</span>
          </template>
        </el-table-column>

        <!-- programCount -->
        <el-table-column>
          <template v-slot="scope">
            <span class="gray">节目 {{ scope.row.programCount }}</span>
          </template>
        </el-table-column>
      </el-table>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      djRadios: [],
    }
  },
  created() {
    this.getDjRadios()
  },
  methods: {
    async getDjRadios() {
      const { data: res } = await this.$http.get('/dj/sublist')
      this.djRadios = res.djRadios
      // console.log(this.djRadios)
    },
  },
}
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  header {
    padding: 30px;
    box-sizing: border-box;
    .sub-tittle {
      // font-size: 25px;
      display: inline-block;
      font-size: 15px;
      font-weight: 600;
      margin: 20px 5px 0 0;
    }
  }
}
footer {
  // width: 100%;
  //padding-left: 0;
  img {
    // box-sizing: border-box;
    // display: block;
    width: 65px;
    // height: 65px;

    margin-left: 30px;
    border-radius: 5px;
  }
}
/deep/.el-table td {
  cursor: pointer;
}
/deep/.el-table th {
  display: none;
}
</style>
