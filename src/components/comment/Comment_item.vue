<template>
  <!-- 最新评论 -->
  <section class="fantastic-comment">
    <div class="comment-content-box" v-for="(item, i) in comments" :key="i">
      <img :src="item.user.avatarUrl" alt class="avatar" />
      <div class="right-box">
        <!-- 评论内容 -->
        <div class="comment">
          <span class="name link">{{ item.user.nickname }}:</span>
          <span>{{ item.content }}</span>
        </div>
        <!-- 回复区域 -->
        <div class="beReplied-wrap" v-if="item.beReplied.length !== 0">
          <span class="name link">@{{ item.beReplied[0].user.nickname }}:</span>
          <span>{{ item.beReplied[0].content }}</span>
        </div>
        <div class="aside-info">
          <!-- 发布时间区域 -->
          <span>
            <span class="time gray">{{ item.timeStr }}</span>
          </span>
          <!-- 操作区域 -->
          <span class="operate-box gray">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-dianzan2" />
            </svg>
            {{ item.likedCount }}
            <span>|</span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-share-circle-line" />
            </svg>
            <span>|</span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-comment-lines" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  props: {
    comments: {
      type: Array,
      require: true,
    },
    // total: [String, Number],
  },
  data() {
    return {}
  },
}
</script>

<style lang="less" scoped>
.fantastic-comment {
  margin-top: 10px;
  .comment-content-box {
    font-size: 11px;
    margin: 20px 0;
    display: flex;
    border-bottom: 1px solid #eee;
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .right-box {
      margin-bottom: 15px;
      width: 100%;
      margin-left: 15px;
      .beReplied-wrap {
        margin: 10px 0;
        padding: 7px;
        background-color: #f4f4f4;
      }
      // display: flex;
      .aside-info {
        display: flex;
        justify-content: space-between;
        margin-top: 8px;
        .time {
          margin-right: 10px;
        }
        .operate-box {
          font-size: 9px;
          display: flex;
          align-items: center;
          span {
            margin: 0 15px;
          }
          svg {
            cursor: pointer;
          }
          svg:hover {
            color: #3f3f3f;
          }
        }
      }
    }
  }
}
</style>
