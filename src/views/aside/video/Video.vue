<template>
  <div class="main-box">
    <el-tabs v-model="activeName">
      <!-- 个性推荐 -->
      <el-tab-pane label="视频" name="first"> </el-tab-pane>
      <el-tab-pane label="MV" name="second">
        <div class="tittle-box">
          <!-- 头部区域 -->
          <header>
            <div class="pointer tittle-little">
              最新MV
              <span>
                <svg class="icon icon-arrow" aria-hidden="true">
                  <use xlink:href="#icon-arrowright"></use></svg
              ></span>
            </div>
            <div class="area-box gray">
              <span
                @click="areaSelected(1, '内地')"
                :class="{ select: areaIndex === 1 }"
                :v-model="area"
                >内地</span
              ><span
                @click="areaSelected(2, '港台')"
                :class="{ select: areaIndex === 2 }"
                >港台</span
              ><span
                @click="areaSelected(3, '欧美')"
                :class="{ select: areaIndex === 3 }"
                >欧美</span
              ><span
                @click="areaSelected(4, '日本')"
                :class="{ select: areaIndex === 4 }"
                >日本</span
              ><span
                @click="areaSelected(5, '韩国')"
                :class="{ select: areaIndex === 5 }"
                >韩国</span
              >
            </div>
          </header>

          <!-- MV区域 -->
          <footer>
            <div class="mv-box">
              <div
                class="cover-box"
                v-for="(item, i) in mv.slice(1, mv.length)"
                :key="i"
                @click="toMvPage(item.id)"
              >
                <img :src="item.cover" alt="" />
                <span>{{ item.name }}</span>
                <span>{{ item.artistName }}</span>
                <span class="playCount">
                  <svg class="icon icon-right-triangle" aria-hidden="true">
                    <use xlink:href="#icon-right-triangle"></use></svg
                  >{{ item.playCount | playCountFormat }}</span
                >
              </div>
            </div>
          </footer>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'second',
      areaIndex: 1,
      mv: [],
      area: '',
    }
  },
  created() {
    this.getNewMv()
  },
  methods: {
    async getNewMv() {
      const { data: res } = await this.$http.get('/mv/first', {
        params: {
          limit: 7,
          area: this.area,
        },
      })
      this.mv = res.data
      // console.log(res)
    },
    // 点击对应的低于获取不同地区的MV
    areaSelected(index, area) {
      // console.log(area)
      this.areaIndex = index
      this.area = area
      this.getNewMv()
    },
    toMvPage(id) {
      this.$router.push({
        path: `videoPlayer/${id}`,
      })
    },
  },
}
</script>

<style lang="less" scoped>
.main-box {
  padding: 20px 30px 0 30px;
  width: 100%;
}
.tittle-box {
  // width: 100%;
  margin-top: 50px;
}
.select {
  border-radius: 15px;
  color: #ec4141;
  background-color: #fcebeb;
}
.select:hover {
  color: #ec4141 !important;
}
header {
  display: flex;
  justify-content: space-between;
  .area-box {
    span {
      padding: 3px 13px;
      margin: 0 5px 0 5px;
      cursor: pointer;
    }
    span:hover {
      color: #373737;
    }
  }
}
footer {
  .mv-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    // align-items: center;
    // width: 100%;
    .cover-box {
      position: relative;
      cursor: pointer;
      width: 32%;
      // height: 30%;
      margin: 20px 0 10px 0;
      overflow: hidden;
      img {
        width: 100%;
        // height: 100%;
      }
      span {
        margin-top: 5px;
        display: block;
      }
      span:nth-child(3) {
        font-size: 12px;
        color: #7f7f88;
      }
      .playCount {
        position: absolute;
        color: #fff;
        top: 0px;
        right: 8px;
        font-size: 14px;
        .icon-right-triangle {
          font-size: 10px;
        }
      }
    }
  }
}

/deep/.el-tabs__item {
  font-size: 18px;
  color: #373737;
}

/deep/.el-tabs__item.is-active {
  color: #373737;
  font-size: 20px;
  font-weight: 600;
}
/deep/.el-tabs__item:hover {
  color: black;
}
/deep/.el-tabs__nav-wrap::after {
  height: 0;
}
/deep/.el-tabs__active-bar {
  background-color: #ec4141;

  height: 4px;
  border-radius: 2px;
}
/deep/.el-tabs__nav-scroll {
  overflow: hidden;
  position: fixed;
  z-index: 11;
  background-color: #fff;
  width: 100%;
  height: 60px;
  margin-top: -15px;
  padding-top: 15px;
}
</style>
