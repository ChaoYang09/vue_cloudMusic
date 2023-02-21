<template>
  <div class="comment-wrap">
    <div class="comment-content">
      <!-- 评论 -->
      <textarea
        name="text"
        id=""
        cols="30"
        rows="10"
        class="text-area"
        v-model="textInput"
      ></textarea
      ><span class="count light-gray">{{
        140 - textInput.length + replyName.length
      }}</span>
      <!-- 功能区 -->
      <div class="func">
        <div class="sign">
          <span class="gray" @click="textInput += '@'">@</span
          ><span class="gray" @click="textInput += '#输入想说的话题#'">#</span>
        </div>
        <span class="btn border" @click="comment">评论</span>
      </div>

      <!-- 评论区域 -->
      <div class="font-14 gray slim flex-center mt-30" v-if="totalCount == 0">
        还没有评论, 快来抢沙发~
      </div>
      <div v-else>
        <!-- 精彩评论 -->
        <div v-if="currentPage == 1 && hotComments.length !== 0" class="mt-40">
          <span class="font-14 bold">精彩评论</span>
          <Comment-Item
            :comments="hotComments"
            :type="type"
            :id="id"
            @replyComment="replyComment"
          ></Comment-Item>
        </div>

        <!-- <div class="flex-center"><div class="btn">更多精彩评论 ></div></div> -->

        <!-- 最新评论 -->
        <div ref="newRef">
          <div class="font-14 bold mt-40">最新评论({{ totalCount }})</div>
          <Comment-item
            :comments="newComments"
            :type="type"
            :id="id"
            @replyComment="replyComment"
            @subCommentCount="subCommentCount"
          ></Comment-item>
          <div class="flex-center">
            <el-pagination
              v-if="currentPage > 1"
              background
              layout="prev, pager, next"
              :page-size="20"
              :total="totalCount"
              :current-page="currentPage"
              @current-change="handleCurrentChange"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHotComment, getNewComment, comment } from '@/api/comment'
import CommentItem from '@/components/comment/Comment_item.vue'
export default {
  components: {
    CommentItem,
  },
  props: {
    id: {
      type: [Number, String],
      require: true,
    },

    type: {
      type: [Number, String],
      require: true,
    },
  },
  data() {
    return {
      currentPage: 1,
      // iconShow: true,
      textInput: '',
      count: '',
      hotComments: [], //精彩评论
      newComments: [], //最新评论
      totalCount: null, //评论数量
      hotInfo: {
        id: this.id,
        limit: 10,
        type: this.type,
      },
      newInfo: {
        id: this.id,
        limit: 20,
        type: this.type,
        offset: 0,
      },
      replyName: '',
      t: null /* t:0 删除 1 发送, 2 回复*/,
      commentId: 0,
      isDelete: false, //评论后显示删除图标
      subContent: '', //子组件传过来的评论内容
      res: {},
    }
  },
  watch: {
    id() {
      // console.log(this.type)
      // console.log(this.id)
      this.hotInfo.id = this.id
      this.newInfo.id = this.id
      this.hotInfo.type = this.type
      this.newInfo.type = this.type
      this.getHotComment()
      this.getNewComment()
    },
    type(newVal) {
      // console.log(newVal)
    },
  },
  created() {
    this.getHotComment()
    this.getNewComment()
  },
  methods: {
    // 发送评论
    async comment() {
      if (this.textInput == '')
        return this.$message({
          dangerouslyUseHTMLString: true,
          message:
            ' <svg class="icon font-23 mr-15"><use xlink:href="#icon-roundclosefill" /></svg>写点东西吧, 内容不能为空哦 !',
          center: true,
          duration: 1500,
        })
      if (!this.$store.state.isLogin)
        return this.$store.commit('setLoginVisible', true)
      if (this.commentId === 0) {
        console.log('发送评论。。。')
        var res = await comment({
          t: 1,
          type: this.type,
          id: this.id,
          content: this.textInput,
        })
        res.comment.beReplied = []
      } else {
        console.log('回复评论。。。')
        const str = this.textInput.replace(this.replyName, '')
        // console.log(str)
        var res = await comment({
          t: 2,
          type: this.type,
          id: this.id,
          content: str,
          commentId: this.commentId,
        })
        // console.log(res)
        res.comment.beReplied = [
          {
            user: {
              nickname: res.comment.beRepliedUser.nickname,
            },
            content: this.subContent,
          },
        ]
      }
      // console.log(res)
      res.comment.liked = false
      res.comment.likedCount = 0
      res.comment.timeStr = '刚刚'
      console.log(res)
      this.newComments.unshift(res.comment)
      this.totalCount += 1
      this.$emit('getCommentCount', this.totalCount)
      if (res.code !== 200)
        return this.$message({
          dangerouslyUseHTMLString: true,
          message:
            ' <svg class="icon font-23 mr-15"><use xlink:href="#icon-roundclosefill" /></svg>评论失败 !',
          center: true,
          duration: 1500,
        })
      this.$message({
        dangerouslyUseHTMLString: true,
        message:
          ' <svg class="icon font-23 mr-15"><use xlink:href="#icon-success-filling" /></svg>评论成功 !',
        center: true,
        duration: 1500,
      })
      this.textInput = ''
    },
    // 删除评论 数量减一
    subCommentCount() {
      this.totalCount -= 1
      this.$emit('getCommentCount', this.totalCount)
    },
    // 获取精彩评论
    async getHotComment() {
      // console.log('hot......')
      const res = await getHotComment(this.hotInfo)
      this.hotComments = res.hotComments
    },
    // 获取最新评论
    async getNewComment() {
      const res = await getNewComment(this.newInfo)
      this.newComments = res.comments
      this.totalCount = res.total
      this.$emit('getCommentCount', res.total)
    },

    // 分页的钩子
    handleCurrentChange(val) {
      console.log(val)
      this.currentPage = val
      this.newInfo.offset = (val - 1) * 20
      this.getNewComment()
    },
    replyComment(res) {
      this.replyName = `回复${res.user.nickname}:`
      this.textInput = `回复${res.user.nickname}:`
      this.commentId = res.commentId
      this.subContent = res.content
      // console.log(this.commentId)
    },
  },
}
</script>

<style lang="less" scoped>
.comment-wrap {
  // padding: 20px 30px;
  width: 100%;
}
.comment-content {
  position: relative;
  .text-area {
    outline: none;
    width: 100%;
    height: 70px;
    border-radius: 5px;
    border: 1px solid #ccc;
    resize: none;
    padding: 5px;
  }
  .count {
    position: absolute;
    right: 7px;
    top: 52px;
  }
  .func {
    margin-top: 5px;
    display: flex;
    justify-content: space-between;
    // align-items: center;
    .sign {
      font-size: 18px;
      span {
        margin-right: 10px;
        cursor: default;
      }
      span:hover {
        color: #373737;
      }
    }
  }
}
</style>
