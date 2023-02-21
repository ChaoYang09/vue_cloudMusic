<template>
  <el-container>
    <el-main>
      <div class="left">
        <h2>编辑个人信息</h2>
        <el-form
          ref="editForm"
          :model="editForm"
          label-width="45px"
          size="small"
        >
          <el-form-item label="昵称:">
            <el-input v-model="editForm.nickname"></el-input>
          </el-form-item>
          <el-form-item label="介绍:">
            <el-input type="textarea" v-model="editForm.signature"></el-input>
          </el-form-item>
          <el-form-item label="性别:">
            <el-radio-group v-model="editForm.gender">
              <el-radio :label="0">保密</el-radio>
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <span class="btn btn-l border mr-20" @click="$router.back()">取消</span>
        <span class="btn btn-l btn-red" @click="editUserInfo">保存</span>
      </div>
      <div class="right">
        <img :src="avatarUrl" alt="" />
        <span
          class="btn btn-l border block center"
          style="margin: 15px 30px"
          @click="editVisible = true"
          >修改头像</span
        >
      </div>
    </el-main>

    <!-- 头像修改对话框 -->
    <el-dialog :visible.sync="editVisible" width="40%" @closed="imageUrl = ''">
      <!-- <img width="100%" :src="dialogImageUrl" alt="" /> -->
      <el-upload
        class="avatar-uploader"
        action
        :on-change="handleChange"
        :show-file-list="false"
        :auto-upload="false"
        ref="uploadRef"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <span class="btn btn-l mr-10" @click="editVisible = false">取消</span>
        <span class="btn btn-l btn-red" @click="updateAvatar">确定</span>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
import { editUserInfo, getUserDetail, uploadAvatar } from '@/api/user'
export default {
  data() {
    return {
      avatarUrl: '',
      editForm: {
        gender: null, //性别 0:保密 1:男性 2:女性
        birthday: 974885746324, //出生日期,时间戳 unix timestamp
        nickname: '', //用户昵称
        province: 410000, //省份id
        city: 410100, //城市id
        signature: '', //用户签名
      },
      editVisible: false,
      imageUrl: '',
      formData: new FormData(),
      imgSize: null,
    }
  },
  created() {
    this.initUserInfo()
  },
  methods: {
    // 初始化个人信息
    async initUserInfo() {
      const res = await getUserDetail(this.$store.state.uid)
      // console.log(res)
      if (res.code !== 200) return
      const {
        nickname,
        signature,
        gender,
        birthday,
        province,
        city,
        avatarUrl,
      } = res.profile
      this.editForm = {
        nickname,
        signature,
        gender,
        birthday,
        province,
        city,
      }
      this.avatarUrl = avatarUrl

      // console.log(this.editForm.gender)
    },
    // 提交个人修改信息
    async editUserInfo() {
      const res = await editUserInfo(this.editForm)
      if (res.code !== 200)
        return this.$message({
          dangerouslyUseHTMLString: true,
          message:
            ' <svg class="icon font-23 mr-15"><use xlink:href="#icon-roundclosefill" /></svg>修改个人信息失败 !',
          center: true,
          duration: 1500,
        })
      this.initUserInfo()
      this.$message({
        dangerouslyUseHTMLString: true,
        message:
          ' <svg class="icon font-23 mr-15"><use xlink:href="#icon-success-filling" /></svg>修改个人信息成功 !',
        center: true,
        duration: 1500,
      })
    },

    // 提交头像修改信息
    async updateAvatar() {
      // console.log(this.formData)
      if (JSON.toString(this.formData) == '{}') return
      const res = await uploadAvatar({
        data: this.formData,
        imgSize: this.imgSize.width,
      })
      console.log(res)
      if (res.code !== 200)
        return this.$message({
          dangerouslyUseHTMLString: true,
          message:
            ' <svg class="icon font-23 mr-15"><use xlink:href="#icon-roundclosefill" /></svg>修改头像失败 !',
          center: true,
          duration: 1500,
        })
      this.$message({
        dangerouslyUseHTMLString: true,
        message:
          ' <svg class="icon font-23 mr-15"><use xlink:href="#icon-success-filling" /></svg>修改头像成功 !',
        center: true,
        duration: 1500,
      })

      const res2 = await getUserDetail(this.$store.state.uid)
      if (res2.code !== 200) return
      this.editVisible = false
      // this.imageUrl = ''
      this.avatarUrl = res2.profile.avatarUrl
      this.$store.commit('setUserInfo', {
        nickname: res2.profile.nickname,
        avatarUrl: res2.profile.avatarUrl,
      })
    },
    async handleChange(file) {
      // console.log(file)
      this.imageUrl = URL.createObjectURL(file.raw)
      this.formData.append('imgFile', file.raw)
      this.imgSize = await this.getImgSize(file.raw)
      // console.log(this.imgSize)
    },
    /* 计算图片大小 */
    getImgSize(file) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader()
        reader.onload = function (file) {
          // console.log(file.target)
          let image = new Image()
          image.src = file.target.result
          image.onload = function () {
            resolve({
              width: this.width,
              height: this.height,
            })
          }
        }

        if (file) {
          reader.readAsDataURL(file)
        } else {
          reject('出错了')
        }
      })
    },
  },
}
</script>
<style lang="less" scoped>
.el-main {
  display: flex;
  justify-content: flex-start;
  .left {
    min-width: 750px;
    .el-button {
      padding-left: 25px;
      // white-space: 60px;
      text-align: center;
      letter-spacing: 10px;
    }
  }
  .el-form {
    margin: 60px 60px 0 0;
  }
  .right {
    // display: flex;
    // justify-content: center;
    // flex-wrap: wrap;
    margin-top: 85px;
    img {
      display: block;
      border-radius: 3px;
      width: 170px;
      height: 170px;
    }
    // .el-button {
    //   margin: 20px 0 0 40px;
    // }
  }
}
.select_margin {
  margin: 0 10px;
}
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 178px;
  margin: 0 auto;
}
.avatar-uploader:hover {
  border-color: #ec4141;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
