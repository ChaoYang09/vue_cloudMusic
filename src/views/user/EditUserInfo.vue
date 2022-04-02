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
          <!-- <el-form-item label="生日:">
            <el-select placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            <el-select placeholder="请选择活动区域" class="select_margin">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            <el-select placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="地区:">
            <el-select placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            <el-select placeholder="请选择活动区域" class="select_margin">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item> -->
        </el-form>
        <el-button round size="small" @click="editUserInfo">保存</el-button
        ><el-button round size="small">取消</el-button>
      </div>
      <div class="right">
        <img :src="accountInfo.avatarUrl" alt="" />
        <el-button round size="small" @click="dialogVisible = true"
          >修改头像</el-button
        >
      </div>
    </el-main>

    <!-- 头像修改对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="40%">
      <!-- <img width="100%" :src="dialogImageUrl" alt="" /> -->
      <el-upload
        class="avatar-uploader"
        :action="uploadUrl"
        :headers="headers"
        :show-file-list="false"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      accountInfo: {},
      editForm: {
        gender: null, //性别 0:保密 1:男性 2:女性

        birthday: 974885746324, //出生日期,时间戳 unix timestamp

        nickname: '', //用户昵称

        province: 410000, //省份id

        city: 410100, //城市id

        signature: '', //用户签名
      },
      dialogVisible: false,
      uploadUrl: 'http://localhost:3000/avatar/upload',
      imageUrl: '',
      // uploadData: {
      //   data: '',
      //   cookie: '',
      // },
      headers: {
        // Authorization: window.sessionStorage.getItem('cookie'),
        // 'Content-Type': 'multipart/form-data',
      },
    }
  },
  created() {
    this.initUserInfo()
  },
  methods: {
    // 初始化个人信息
    initUserInfo() {
      this.accountInfo = this.$route.query.accountInfo
      // console.log(accountInfo)
      this.editForm.nickname = this.accountInfo.nickname
      this.editForm.signature = this.accountInfo.signature
      this.editForm.gender = this.accountInfo.gender
      // console.log(this.editForm.gender)
    },
    // 提交个人修改信息
    async editUserInfo() {
      const { data: res } = await this.$http.get('/user/update', {
        params: this.editForm,
      })
      // console.log(res)
      if (res.code !== 200) return this.$message.error('修改失败！')
      this.$message.success('修改成功！')
    },

    // handleAvatarSuccess(res, file) {
    //   this.imageUrl = URL.createObjectURL(file.raw)
    // },
    beforeAvatarUpload(file) {
      // console.log(file)
      // var formData = new FormData()
      // formData.append('imgFile', file)
      // this.uploadData.data = formData
      // console.log(formData)
      // this.uploadData.cookie = window.localStorage.getItem('cookie')
      // console.log(this.uploadData.cookie)

      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
  },
}
</script>
<style lang="less" scoped>
.el-main {
  display: flex;
  justify-content: start;
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
    margin-top: 85px;
    img {
      display: block;
      border-radius: 3px;
      width: 170px;
      height: 170px;
    }
    .el-button {
      margin: 20px 0 0 40px;
    }
  }
}
.select_margin {
  margin: 0 10px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
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
