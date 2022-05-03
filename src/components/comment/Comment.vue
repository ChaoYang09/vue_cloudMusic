<template>
  <div class="main-box">
    <div class="comment-box">
      <!-- 评论 -->
      <textarea
        name="text"
        id=""
        cols="30"
        rows="10"
        class="text-area"
        v-model="count"
      ></textarea
      ><span class="count light-gray">{{ 140 - count.length }}</span>
      <!-- 功能区 -->
      <div class="func">
        <div class="sign">
          <span class="gray" @click="count += '@'">@</span
          ><span class="gray" @click="count += '#输入想说的话题#'">#</span>
        </div>
        <span class="btn">评论</span>
      </div>
      <!-- 精彩评论 -->
      <div class="bold mt-10">精彩评论</div>
      <Comment-Item :comments="hotComments"></Comment-Item>
      <div class="flex-center"><div class="btn">更多精彩评论 ></div></div>

      <!-- 最新评论 -->
      <div ref="newRef">
        <div class="bold mt-10">最新评论({{ totalCount }})</div>
        <Comment-item :comments="newComments"></Comment-item>
        <div class="flex-center">
          <el-pagination
            small
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
</template>

<script>
import { getHotComment, getNewComment } from '@/api/comment'
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
      count: '',
      hotComments: [], //精彩评论
      newComments: [], //最新评论
      totalCount: null,
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
    }
  },
  created() {
    this.getHotComment()
    this.getNewComment()
  },
  methods: {
    // 获取精彩评论
    async getHotComment() {
      const res = await getHotComment(this.hotInfo)
      this.hotComments = res.hotComments
    },
    // 获取最新评论
    async getNewComment() {
      const res = await getNewComment(this.newInfo)
      this.newComments = res.comments
      this.totalCount = res.total
    },

    // 分页的钩子
    handleCurrentChange(val) {
      this.currentPage = val
      this.newInfo.offset = (val - 1) * 20
      this.getNewComment()
    },
  },
}
</script>

<style lang="less" scoped>
.main-box {
  // padding: 20px 30px;
  width: 100%;
}
.comment-box {
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
