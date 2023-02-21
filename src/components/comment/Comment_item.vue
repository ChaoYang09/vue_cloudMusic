<template>
  <!-- 最新评论 -->
  <section class="fantastic-comment">
    <div class="comment-content-box" v-for="(item, i) in comments" :key="i">
      <img
        @click="common.toUser(item.user.userId)"
        :src="item.user.avatarUrl"
        alt
        class="avatar pointer"
      />
      <div class="right-box">
        <!-- 评论内容 -->
        <div class="comment">
          <span class="name link" @click="common.toUser(item.user.userId)"
            >{{ item.user.nickname }}:
          </span>
          <span>{{ item.content }}</span>
        </div>
        <!-- 回复区域 -->
        <div class="beReplied-wrap" v-if="item.beReplied.length !== 0">
          <span class="name link" v-if="item.beReplied[0].content !== null"
            >@{{ item.beReplied[0].user.nickname }}:
          </span>

          <span v-if="item.beReplied[0].content !== null">{{
            item.beReplied[0].content
          }}</span>
          <!-- 回复的评论被删除显示 -->
          <div class="flex-center deeper-gray" v-else>
            <span>该评论已被删除</span>
          </div>
        </div>
        <div class="aside-info">
          <!-- 发布时间区域 -->
          <span>
            <span class="time gray default">{{ item.timeStr }}</span>
          </span>

          <!-- 操作区域 -->
          <span class="operate-box deeper-gray">
            <!-- 删除icon -->

            <svg
              class="icon svg position"
              aria-hidden="true"
              style="top: 0.5px"
              v-if="item.user.userId == $store.state.uid"
              @click="deleteComment(item)"
            >
              <use xlink:href="#icon-shanchuDelete" />
            </svg>
            <span
              class="mx-15 default"
              v-if="item.user.userId == $store.state.uid"
              >|</span
            >

            <!-- 点赞icon -->
            <span class="svg" @click="likeComment(item)">
              <!-- 点赞成功 -->
              <svg
                class="icon icon-like"
                aria-hidden="true"
                v-if="item.liked && $store.state.isLogin"
              >
                <use xlink:href="#icon-icliked" />
              </svg>
              <!-- 未点赞 -->
              <svg
                class="icon position"
                aria-hidden="true"
                style="top: 2px; margin-bottom: 2px"
                v-else
              >
                <use xlink:href="#icon-dianzan2" />
              </svg>

              <span v-show="item.likedCount !== 0">{{ item.likedCount }}</span>
            </span>

            <span class="mx-15 default">|</span>
            <!-- 分享icon -->
            <svg class="icon svg position" aria-hidden="true" style="top: 1px">
              <use xlink:href="#icon-share-circle-line" />
            </svg>
            <span class="mx-15 default">|</span>
            <!-- 评论icon -->
            <svg
              class="icon svg position"
              aria-hidden="true"
              style="top: 0.5px"
              @click="replyComment(item)"
            >
              <use xlink:href="#icon-comment-lines" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { likeComment, comment } from '@/api/comment'
export default {
  props: {
    comments: {
      type: Array,
      require: true,
    },
    type: {
      type: [Number, String],
      require: true,
    },
    id: {
      type: [Number, String],
      require: true,
    },
  },
  data() {
    return {
      // comments: [],
    }
  },
  watch: {
    comments(newVal) {
      this.comments = newVal
    },
  },
  methods: {
    // 点赞评论
    async likeComment(item) {
      if (!this.$store.state.isLogin)
        return this.$store.commit('setLoginVisible', true)
      const i = this.comments.indexOf(item)
      const res = await likeComment({
        id: this.id,
        cid: item.commentId,
        type: this.type,
        t: item.liked ? 0 : 1,
      })
      if (res.code !== 200)
        return this.$message({
          dangerouslyUseHTMLString: true,
          message:
            ' <svg class="icon font-23 mr-15"><use xlink:href="#icon-roundclosefill" /></svg>点赞失败 !',
          center: true,
          duration: 1500,
        })
      if (!item.liked) {
        this.$set(
          this.comments[i],
          'likedCount',
          this.comments[i].likedCount + 1
        )
        this.$set(this.comments[i], 'liked', true)
      } else if (item.liked) {
        this.$set(
          this.comments[i],
          'likedCount',
          this.comments[i].likedCount - 1
        )
        this.$set(this.comments[i], 'liked', false)
      }
    },
    // 删除评论
    async deleteComment(item) {
      const i = this.comments.indexOf(item)
      this.comments.splice(i, 1)
      this.$emit('subCommentCount')
      const res = await comment({
        t: 0,
        type: this.type,
        id: this.id,
        commentId: item.commentId,
      })
      if (res.code !== 200)
        return this.$message({
          dangerouslyUseHTMLString: true,
          message:
            ' <svg class="icon mr-15 font-23" ><use xlink:href="#icon-roundclosefill" /></svg>删除评论失败 !',
          center: true,
          duration: 1500,
        })

      // console.log(res)
    },

    // 回复评论
    replyComment(item) {
      // console.log(name)
      this.$emit('replyComment', item)
    },
  },
}
</script>

<style lang="less" scoped>
.icon-like {
  font-size: 10px;
  color: #ec4141;
  position: relative;
  top: 1px;
}
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
          .svg {
            height: 17px;
            cursor: pointer;
          }
          .svg:hover {
            color: #3f3f3f;
          }
        }
      }
    }
  }
}
</style>
