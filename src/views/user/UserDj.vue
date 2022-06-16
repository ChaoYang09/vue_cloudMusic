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
      <Table :tableData="djRadios" :type="1009">
        <!-- programCount -->
        <el-table-column>
          <template v-slot="scope">
            <span class="gray slim">节目 {{ scope.row.programCount }}</span>
          </template>
        </el-table-column></Table
      >
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Table from '@/components/table/Table.vue'

export default {
  name: 'userDj',
  components: { Table },
  data() {
    return {}
  },
  created() {
    this.$store.dispatch('getDjRadios')
  },
  computed: {
    ...mapState(['djRadios']),
  },
  methods: {},
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
