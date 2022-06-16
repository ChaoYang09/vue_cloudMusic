<template>
  <!-- 搜索框区域 -->
  <div class="search-wrap">
    <!-- 搜索图标 -->
    <svg class="icon icon-search1" aria-hidden="true">
      <use xlink:href="#icon-search"></use>
    </svg>
    <!-- 弹框 -->
    <el-popover
      ref="popoverRef"
      placement="right"
      width="330"
      trigger="click"
      @after-leave="getSearchHistory"
      popper-class="my-popover"
    >
      <input
        slot="reference"
        type="text"
        class="search"
        placeholder="搜索"
        onfocus="this.placeholder=''"
        onblur="this.placeholder='搜索'"
        v-model.trim="searchInput"
        @keydown="toSearchPage"
      />

      <!-- 搜索历史和建议区域 -->
      <div v-show="toggleSearch">
        <!-- 搜索历史 -->
        <section class="searchHistory-Box">
          <div class="mt-10" v-if="historyTags.length !== 0">
            <span>搜索历史</span>
            <svg
              class="icon icon-delete"
              aria-hidden="true"
              @click="removeSearchHistory"
            >
              <use xlink:href="#icon-shanchuDelete"></use>
            </svg>
          </div>
          <!-- 搜索历史标签 -->
          <div class="tag-Box">
            <el-tag
              v-for="(item, i) in historyTags"
              :key="i"
              class="tag"
              size="medium"
              effect="plain"
              type="info"
              closable
              @close="handleClose(item)"
              @click="toSearchHistory(item)"
            >
              {{ item }}</el-tag
            >
          </div>
        </section>

        <!-- 热搜榜 -->
        <section class="hotSearch-Box">
          <span class="hot-tittle">热搜榜</span>
          <div>
            <p
              v-for="(item, i) in hotSearch"
              :key="i"
              @click="toHotSearch(item.searchWord)"
            >
              <span class="hot-index">{{ i + 1 }}</span>
              <span class="searchWord">{{ item.searchWord }}</span
              ><span class="score light-gray">{{ item.score }}</span>
            </p>
          </div>
        </section>
      </div>

      <!-- 搜索建议区域 -->
      <div class="suggestBox" v-show="!toggleSearch">
        <div class="suggest-search">
          搜"<span class="blue">{{ searchInput }}</span
          >"相关的结果 >
        </div>

        <!-- 单曲 -->
        <div class="songsBox" v-if="songs">
          <div class="search-tittle">
            <svg class="icon icon-search" aria-hidden="true">
              <use xlink:href="#icon-musicnot"></use>
            </svg>
            单曲
          </div>
          <div class="content">
            <p
              v-for="(item, i) in songs"
              :key="i"
              class="hidden-1"
              @click="playMusic(item.id)"
            >
              {{ item.name }}
              <span
                class="gray slim"
                v-if="item.alias.length !== 0 || item.transNames"
                >({{
                  item.alias[0] ? item.alias[0] : item.transNames[0]
                }})</span
              >
              -
              {{ item.artists[0].name }}
            </p>
          </div>
        </div>

        <!-- 歌手 -->
        <div class="artistsBox" v-if="artists">
          <div class="search-tittle">
            <svg class="icon icon-search" aria-hidden="true">
              <use xlink:href="#icon-User"></use>
            </svg>
            歌手
          </div>
          <div class="content">
            <p
              v-for="(item, i) in artists"
              :key="i"
              class="hidden-1"
              @click="toArtist(item.id)"
            >
              {{ item.name }}
            </p>
          </div>
        </div>

        <!-- 专辑 -->
        <div class="albumsBox" v-if="albums">
          <div class="search-tittle">
            <svg class="icon icon-search" aria-hidden="true">
              <use xlink:href="#icon-music-albums"></use>
            </svg>
            专辑
          </div>
          <div class="content">
            <p
              v-for="(item, i) in albums"
              :key="i"
              class="hidden-1"
              @click="toAlbumList(item.id)"
            >
              {{ item.name }} - {{ item.artist.name }}
            </p>
          </div>
        </div>

        <!-- 歌单 -->
        <div class="playlistsBox" v-if="playlists">
          <div class="search-tittle">
            <svg class="icon icon-search" aria-hidden="true">
              <use xlink:href="#icon-playlist2"></use>
            </svg>
            歌单
          </div>
          <div class="content">
            <p
              v-for="(item, i) in playlists"
              :key="i"
              class="hidden-1"
              @click="toSongsList(item.id)"
            >
              {{ item.name }}
            </p>
          </div>
        </div>
      </div>
    </el-popover>
  </div>
</template>

<script>
import { getSuggestionInfo, getHotSearch } from '@/api/search'
import { getSongDetail } from '@/api/music'

export default {
  data() {
    return {
      searchInput: '', //搜索框

      albums: [], //专辑
      artists: [], //歌手
      songs: [], //单曲
      playlists: [], //歌单

      timer: null, //定时器
      hotSearch: [], //热搜榜
      historyTags: [], //搜索历史
      toggleSearch: true,
    }
  },
  created() {
    this.getSearchHistory() //获取搜索历史

    this.getHotSearch() //请求热搜榜数据
  },
  watch: {
    // 监听input值的变化
    searchInput(newVal, oldVal) {
      this.toggleSearch = false
      if (newVal === '') {
        // console.log(newVal, oldVal)
        this.toggleSearch = true
        return
      }
      // console.log('1')
      // clearTimeout(timer)
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.getSuggestionInfo()
      }, 500)
    },
  },
  methods: {
    // 请求搜索建议数据
    async getSuggestionInfo() {
      const res = await getSuggestionInfo({ keywords: this.searchInput })
      if (res.code !== 200) return

      this.songs = res.result.songs
      this.artists = res.result.artists
      this.albums = res.result.albums
      this.playlists = res.result.playlists

      // console.log(this)
    },
    // 请求热搜榜数据
    async getHotSearch() {
      const res = await getHotSearch()
      if (res.code !== 200) return

      this.hotSearch = res.data
    },
    // 点击tag标签里面的删除，对应的标签会被移除
    handleClose(tag) {
      this.historyTags.splice(this.historyTags.indexOf(tag), 1)
      window.localStorage.setItem('searchHistory', this.historyTags.join())
    },
    // 调用后将输入框中的数据保存到localStorage中 并跳转到搜索成功的界面
    searchPage() {
      this.$refs.popoverRef.doClose()

      this.$router.push({
        path: `/search/${this.searchInput}`,
      })
    },
    // 在搜索框中输入后按回车 跳转
    toSearchPage(e) {
      if (e.keyCode == 13 && this.searchInput) {
        this.setSearchHistory(this.searchInput)
        this.searchPage()
      }
    },
    // 向localStorage中添加输入的搜索历史
    setSearchHistory(tag) {
      // 进行搜索历史的重复判断
      const isHas = this.historyTags.some((item) => {
        return item === tag
      })
      if (isHas) return
      this.historyTags.push(tag)
      window.localStorage.setItem('searchHistory', this.historyTags.join())
      // console.log(this.HistoryTags)
    },
    // 获取localStore中的搜索历史
    getSearchHistory() {
      // console.log()
      if (window.localStorage.getItem('searchHistory'))
        this.historyTags = window.localStorage
          .getItem('searchHistory')
          .split(',')
    },
    // 点击垃圾桶图标 删除全部搜索历史
    removeSearchHistory() {
      window.localStorage.removeItem('searchHistory')
      // this.getSearchHistory()
      this.historyTags = []
    },
    // 点击热搜榜对应的行 携带参数跳转到搜索成功的页面
    toHotSearch(val) {
      this.searchInput = val
      this.setSearchHistory(this.searchInput)
      this.searchPage()
    },
    toSearchHistory(tag) {
      // console.log(tag)
      this.searchInput = tag
      this.searchPage()
    },
    toArtist(id) {
      this.$refs.popoverRef.doClose()
      this.common.toArtist(id)
    },
    toAlbumList(id) {
      this.$refs.popoverRef.doClose()
      this.common.toAlbumList(id)
    },
    toSongsList(id) {
      this.$refs.popoverRef.doClose()
      this.common.toSongsList(id)
    },
    async playMusic(id) {
      // console.log(id)
      const res = await getSongDetail(id)
      // console.log(res)
      if (res.code !== 200)
        return this.$message({
          dangerouslyUseHTMLString: true,
          message:
            ' <svg class="icon font-23 mr-15"><use xlink:href="#icon-roundclosefill" /></svg>播放失败 !',
          center: true,
          duration: 1500,
        })
      this.common.playMusic(res.songs[0])
      this.$refs.popoverRef.doClose()
    },
  },
}
</script>
<style>
.my-popover {
  font-size: 13px !important;
  overflow: auto;
  height: 430px;
  padding: 0 !important;
}
</style>
<style lang="less" scoped>
.suggest-search {
  padding: 10px;
  // margin-bottom: 6px;
}
.songsBox,
.artistsBox,
.albumsBox,
.playlistsBox {
  .search-tittle {
    font-size: 12px;
    padding-left: 20px;
    display: flex;
    align-items: center;
    height: 30px;
    line-height: 30px;
    background-color: #f5f5f7;
  }
  .content {
    p {
      font-size: 12px;
      line-height: 30px;
      height: 30px;
      cursor: pointer;
      padding-left: 20px;
    }
    p:hover {
      background-color: #f2f2f2;
    }
  }
}

.searchHistory-Box {
  padding-left: 12px;
  .tag-Box {
    margin-bottom: 20px;
    .tag {
      cursor: pointer;
      margin: 10px 10px 0 0;
    }
    .tag:hover {
      background-color: #f2f2f2;
    }
  }
}
.hotSearch-Box {
  .hot-tittle {
    font-size: 16px;
    display: block;
    margin-bottom: 30px;
    padding-left: 12px;
  }
  p {
    height: 50px;
    line-height: 50px;
    padding-left: 12px;
    cursor: pointer;
    .searchWord {
      margin: 0 10px 0 30px;
    }
    .score {
      font-size: 10px;
    }
  }
  p:nth-child(-n + 3) .hot-index {
    color: #ff3a3a;
    font-size: 17px;
  }
  p:nth-child(-n + 3) .searchWord {
    font-weight: bold;
  }
  p:nth-child(n + 4) .hot-index {
    color: #c9c9c9;
  }
  p:hover {
    background-color: #f3f3f3;
  }
}
.search-wrap {
  margin-top: 20px;
  position: relative;
  .search {
    width: 170px;
    height: 30px;
    border-radius: 15px;
    border: 1px solid #eee;
    outline: none;
    padding-left: 30px;
    background-color: #f6f6f7;
    .icon-search {
      top: 5px;
      left: 10px;
      position: absolute;
    }
  }
}
.icon-search1 {
  top: 5px;
  left: 10px;
  position: absolute;
}
.icon-delete {
  margin-left: 5px;
  font-size: 9px;
  cursor: pointer;
}
.icon-delete:hover {
  color: #000000;
}
</style>
