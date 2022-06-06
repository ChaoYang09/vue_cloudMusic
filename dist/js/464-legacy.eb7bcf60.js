"use strict";(self["webpackChunkvue_cloudmusic"]=self["webpackChunkvue_cloudmusic"]||[]).push([[464],{2464:function(e,t,r){r.r(t),r.d(t,{default:function(){return u}});var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-container",[r("el-main",[r("div",{staticClass:"left"},[r("h2",[e._v("编辑个人信息")]),r("el-form",{ref:"editForm",attrs:{model:e.editForm,"label-width":"45px",size:"small"}},[r("el-form-item",{attrs:{label:"昵称:"}},[r("el-input",{model:{value:e.editForm.nickname,callback:function(t){e.$set(e.editForm,"nickname",t)},expression:"editForm.nickname"}})],1),r("el-form-item",{attrs:{label:"介绍:"}},[r("el-input",{attrs:{type:"textarea"},model:{value:e.editForm.signature,callback:function(t){e.$set(e.editForm,"signature",t)},expression:"editForm.signature"}})],1),r("el-form-item",{attrs:{label:"性别:"}},[r("el-radio-group",{model:{value:e.editForm.gender,callback:function(t){e.$set(e.editForm,"gender",t)},expression:"editForm.gender"}},[r("el-radio",{attrs:{label:0}},[e._v("保密")]),r("el-radio",{attrs:{label:1}},[e._v("男")]),r("el-radio",{attrs:{label:2}},[e._v("女")])],1)],1)],1),r("span",{staticClass:"btn btn-l border mr-20"},[e._v("取消")]),r("span",{staticClass:"btn btn-l btn-red",on:{click:e.editUserInfo}},[e._v("保存")])],1),r("div",{staticClass:"right"},[r("img",{attrs:{src:e.userInfo.avatarUrl,alt:""}}),r("span",{staticClass:"btn btn-l border block center",staticStyle:{margin:"15px 30px"},on:{click:function(t){e.editVisible=!0}}},[e._v("修改头像")])])]),r("el-dialog",{attrs:{visible:e.editVisible,width:"40%"},on:{"update:visible":function(t){e.editVisible=t}}},[r("el-upload",{staticClass:"avatar-uploader",attrs:{action:e.uploadUrl,headers:e.headers,"show-file-list":!1,"before-upload":e.beforeAvatarUpload}},[e.imageUrl?r("img",{staticClass:"avatar",attrs:{src:e.imageUrl}}):r("i",{staticClass:"el-icon-plus avatar-uploader-icon"})]),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("span",{staticClass:"btn btn-l mr-10",on:{click:function(t){e.editVisible=!1}}},[e._v("取消")]),r("span",{staticClass:"btn btn-l btn-red"},[e._v("确定")])])],1)],1)},i=[],s=r(6198),n=(r(8975),{data:function(){return{userInfo:{},editForm:{gender:null,birthday:974885746324,nickname:"",province:41e4,city:410100,signature:""},editVisible:!1,uploadUrl:"http://localhost:3000/avatar/upload",imageUrl:"",headers:{}}},created:function(){this.initUserInfo()},methods:{initUserInfo:function(){this.userInfo=this.$route.query.userInfo,this.editForm.nickname=this.userInfo.nickname,this.editForm.signature=this.userInfo.signature,this.editForm.gender=this.userInfo.gender},editUserInfo:function(){var e=this;return(0,s.Z)(regeneratorRuntime.mark((function t(){var r,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get("/user/update",{params:e.editForm});case 2:if(r=t.sent,a=r.data,200===a.code){t.next=6;break}return t.abrupt("return",e.$message.error("修改失败！"));case 6:e.$message.success("修改成功！");case 7:case"end":return t.stop()}}),t)})))()},beforeAvatarUpload:function(e){var t="image/jpeg"===e.type,r=e.size/1024/1024<2;return t||this.$message.error("上传头像图片只能是 JPG 格式!"),r||this.$message.error("上传头像图片大小不能超过 2MB!"),t&&r}}}),l=n,o=r(1001),c=(0,o.Z)(l,a,i,!1,null,"53596d68",null),u=c.exports}}]);
//# sourceMappingURL=464-legacy.eb7bcf60.js.map