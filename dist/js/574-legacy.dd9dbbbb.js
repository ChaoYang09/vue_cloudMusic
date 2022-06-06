"use strict";(self["webpackChunkvue_cloudmusic"]=self["webpackChunkvue_cloudmusic"]||[]).push([[574],{9033:function(t,e,s){s.d(e,{Z:function(){return c}});var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("span",{class:{label:!0,large:t.large,small:t.small},style:{color:t.color}},[t._t("default")],2)},a=[],r={props:{large:{type:Boolean,default:!1},small:{type:Boolean,default:!1},color:{type:String,default:"#ec4141"}}},n=r,o=s(1001),l=(0,o.Z)(n,i,a,!1,null,"8903a476",null),c=l.exports},4471:function(t,e,s){s.d(e,{Z:function(){return c}});var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("span",{staticClass:"gray default"},[t._v(t._s(t._f("timeFormat")(t.scope.row.dt)))])},a=[],r={props:{scope:{require:!0}}},n=r,o=s(1001),l=(0,o.Z)(n,i,a,!1,null,null,null),c=l.exports},7868:function(t,e,s){s.d(e,{Z:function(){return c}});var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.scope.row.id===t.$store.state.music.id?s("span",[t.$store.state.playing?s("svg",{staticClass:"icon netEase-red align-center center",attrs:{"aria-hidden":"true"}},[s("use",{attrs:{"xlink:href":"#icon-volume-up-fill"}})]):s("svg",{staticClass:"icon netEase-red align-center center font-14",attrs:{"aria-hidden":"true"}},[s("use",{attrs:{"xlink:href":"#icon-md-volume-mute"}})])]):s("span",{staticClass:"light-gray"},[t._v(" "+t._s(t.scope.$index+1+t.offset<10?"0"+(t.scope.$index+1+t.offset):t.scope.$index+1+t.offset)+" ")])},a=[],r=(s(9653),{props:{offset:{type:[Number,String],require:!0,default:0},scope:{}}}),n=r,o=s(1001),l=(0,o.Z)(n,i,a,!1,null,"3351ec42",null),c=l.exports},417:function(t,e,s){s.d(e,{Z:function(){return d}});var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("span",{staticClass:"block",staticStyle:{"margin-left":"-10px"}},[s("svg",{class:{icon:!0,"icon-love":!0,"align-center":!0,"like-love":t.scope.like},attrs:{"aria-hidden":"true"},on:{click:function(e){return t.likeMusic(t.scope)}}},[s("use",{attrs:{"xlink:href":"#icon-icon_love_hover"}})])])},a=[],r=s(6198),n=(s(8975),s(561),s(8777)),o={props:{scope:{require:!0}},methods:{likeMusic:function(t){var e=this;return(0,r.Z)(regeneratorRuntime.mark((function s(){var i,a,r;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:if(e.$store.state.isLogin){s.next=2;break}return s.abrupt("return",e.$store.commit("setLoginVisible",!0));case 2:return s.next=4,(0,n.Yf)({id:t.id,like:!t.like});case 4:if(i=s.sent,200===i.code){s.next=7;break}return s.abrupt("return",e.$message.error("收藏失败"));case 7:t.like?(r=e.$store.state.likeIds,r.splice(r.indexOf(t.id),1),e.$store.commit("setLikeIds",r),t.like=!1,e.$message("取消喜欢成功")):(a=e.$store.state.likeIds,a.unshift(t.id),e.$store.commit("setLikeIds",a),t.like=!0,e.$message.success("已添加到我喜欢的音乐"));case 8:case"end":return s.stop()}}),s)})))()}}},l=o,c=s(1001),u=(0,c.Z)(l,i,a,!1,null,null,null),d=u.exports},9223:function(t,e,s){s.d(e,{Z:function(){return u}});var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{class:{"music-title-wrap":!0}},[s("div",{ref:"nameRef",class:{"hidden-1":!0,"inline-block":!0,default:!0,"netEase-red":t.scope.row.id===t.$store.state.music.id}},[t._v(" "+t._s(t.scope.row.name)+" ")]),s("div",{directives:[{name:"show",rawName:"v-show",value:t.isExtraShow,expression:"isExtraShow"}],ref:"extraRef",staticClass:"extra-wrap hidden-1"},[0!==(t.scope.row.alia||[]).length?s("span",{ref:"aliaRef",staticClass:"gray default"},[t._v("  ("+t._s(t.scope.row.alia[0])+")")]):t._e(),0!==(t.scope.row.tns||[]).length?s("span",{ref:"tnsRef",staticClass:"gray default"},[t._v("  ("+t._s(t.scope.row.tns[0])+")")]):t._e()]),s("div",{ref:"labelRef",staticClass:"label-wrap"},[1===t.scope.row.fee?s("span",{staticClass:"ml-5 position default",staticStyle:{top:"1px"}},[s("Label",{attrs:{small:!0,color:"#fe672e"}},[t._v("VIP")])],1):t._e(),null!==t.scope.row.sq?s("span",{staticClass:"ml-5 position default inline-block",staticStyle:{top:"1px"}},[s("Label",{attrs:{small:!0}},[t._v("SQ")])],1):t._e(),0!==t.scope.row.mv?s("span",{staticClass:"ml-5 pointer position",staticStyle:{position:"relative",top:"1px"}},[s("Label",{attrs:{small:!0},nativeOn:{click:function(e){return t.common.toVideoPlayer(t.scope.row.mv)}}},[t._v("MV   "),s("svg",{staticClass:"icon icon-triangle",attrs:{"aria-hidden":"true"}},[s("use",{attrs:{"xlink:href":"#icon-triangle1-copy"}})])])],1):t._e(),0!==t.scope.row.djId?s("span",{staticClass:"ml-5 position default",staticStyle:{top:"1px"}},[s("Label",{attrs:{small:!0,color:"#999999"}},[t._v("节目")])],1):t._e()])])},a=[],r=(s(8309),s(9033)),n={components:{Label:r.Z},props:{scope:{require:!0,default:function(){return{}}}},data:function(){return{isFlex:!1,isHidden:!1,subScope:this.scope,width:null,name:null,extra:null,subExtra:0,label:null,isExtraShow:!0,id:+new Date}},mounted:function(){this.width=this.scope.column.realWidth,this.width<200&&(this.isExtraShow=!1)},created:function(){},watch:{"scope.column.realWidth":function(t){},"$store.state.page":function(){var t=document.documentElement.scrollTop||document.body.scrollTop;this.common.scrollAnimation(t,0)}},methods:{calcExtraWidth:function(){this.name=this.$refs.nameRef.offsetWidth,console.log(this.scope.$index+" ~~~~~"+this.name),0==this.subExtra&&(this.subExtra=this.$refs.extraRef.offsetWidth),this.label=this.$refs.labelRef.offsetWidth,this.extra=this.$refs.extraRef.offsetWidth;this.name,this.extra,this.label,this.name,this.subExtra,this.label,this.width,this.name,this.label;this.name+this.label>this.width-20&&(this.$refs.nameRef.style.width=this.width-this.label-25+"px",this.isHidden=!0)}}},o=n,l=s(1001),c=(0,l.Z)(o,i,a,!1,null,null,null),u=c.exports},3242:function(t,e,s){s.d(e,{Z:function(){return c}});var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"video-content"},[s("div",{staticClass:"position"},[s("img",{staticClass:"rounded-5",attrs:{src:t.url,alt:""}}),0!==t.duration?s("span",{staticClass:"durations"},[t._v(t._s(t._f("timeFormat")(t.duration)))]):t._e(),s("span",{staticClass:"count"},[s("svg",{staticClass:"icon icon-right-triangle",attrs:{"aria-hidden":"true"}},[s("use",{attrs:{"xlink:href":"#icon-triangle"}})]),t._v(t._s(t._f("playCountFormat")(t.count)))])]),s("span",{staticClass:"hidden-1 block my-5"},[t._t("default"),t._v(" "+t._s(t.name))],2),t._t("author")],2)},a=[],r=(s(9653),{props:{name:{type:String,require:!0},url:{type:String,require:!0},count:{type:[Number,String],require:!0},duration:{type:Number,default:0}},computed:{}}),n=r,o=s(1001),l=(0,o.Z)(n,i,a,!1,null,"6d30f0b7",null),c=l.exports},7574:function(t,e,s){s.r(e),s.d(e,{default:function(){return g}});var i=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"artist-wrap"},[i("header",[i("img",{attrs:{src:t.artistDetail.artist.cover,alt:""}}),i("div",{staticClass:"right"},[i("h2",[t._v(t._s(t.artistDetail.artist.name))]),i("div",{staticClass:"btn-wrap my-10 align-center"},[i("Collect-Button",{attrs:{id:t.$route.query.id,type:"artist"}}),i("span",{staticClass:"btn border"},[i("svg",{staticClass:"icon font-10 mr-5",attrs:{"aria-hidden":"true"}},[i("use",{attrs:{"xlink:href":"#icon-User"}})]),t._v("个人主页")])],1),i("div",[i("span",[t._v("单曲数 : "+t._s(t.artistDetail.artist.musicSize))]),i("span",[t._v("专辑数 : "+t._s(t.artistDetail.artist.albumSize))]),i("span",[t._v("MV数 : "+t._s(t.artistDetail.artist.mvSize))])])])]),i("main",[i("div",{staticClass:"tab-wrap"},[i("el-tabs",{model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[i("el-tab-pane",{attrs:{label:"专辑",name:"album"}},[i("div",{staticClass:"album-wrap"},[i("img",{attrs:{src:s(4083),alt:""}}),i("el-table",{attrs:{data:t.topSongs,stripe:"",size:"mini","show-header":!1,"highlight-current-row":""},on:{"row-dblclick":t.common.playMusic}},[i("el-table-column",{attrs:{align:"center",width:"45","class-name":"color-gray"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("List-index",{attrs:{offset:t.$store.offset,scope:e}})]}}])}),i("el-table-column",{attrs:{width:"20"},scopedSlots:t._u([{key:"default",fn:function(t){return[i("List-love",{attrs:{scope:t.row}})]}}])}),i("el-table-column",{attrs:{"min-width":"500","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(t){return[i("List-title",{attrs:{scope:t}})]}}])}),i("el-table-column",{attrs:{"class-name":"color-gray "},scopedSlots:t._u([{key:"default",fn:function(t){return[i("List-duration",{attrs:{scope:t}})]}}])})],1)],1)]),i("el-tab-pane",{attrs:{label:"MV",name:"mv"}},["mv"===t.activeName?i("div",{staticClass:"video-wrap"},t._l(t.mvs,(function(e,s){return i("Video",{key:s,staticClass:"video",attrs:{count:e.playCount,url:e.imgurl16v9,name:e.name,duration:e.duration},nativeOn:{click:function(s){return t.common.toVideoPlayer(e.id)}}})})),1):t._e()]),i("el-tab-pane",{attrs:{label:"歌手详情",name:"artistDetail"}},t._l(t.introduction,(function(e,s){return i("div",{key:s,staticClass:"detail-wrap"},[i("span",{staticClass:"block bold"},[t._v(" "+t._s(e.ti)+"简介")]),t._l(e.txt,(function(e,s){return i("div",{key:s,staticClass:"pre"},[i("p",{staticClass:"deeper-gray"},[t._v(" "+t._s(e)+" ")])])}))],2)})),0),i("el-tab-pane",{attrs:{label:"相似歌手",name:"simi"}},[i("div",{staticClass:"simi-wrap"},t._l(t.artists,(function(e,s){return i("div",{key:s,staticClass:"simi-content pointer",staticStyle:{width:"18%",margin:"0 2% 3% 0"},on:{click:function(s){return t.common.toArtist(e.id)}}},[i("img",{staticClass:"rounded-5 block",staticStyle:{border:"0.01rem solid #ddd"},attrs:{src:e.img1v1Url,alt:""}}),i("span",{staticClass:"block mt-5 deep-gray"},[t._v(t._s(e.name))])])})),0)])],1)],1)])])},a=[],r=s(6198),n=(s(8975),s(1539),s(4747),s(6699),s(2023),s(8309),s(4916),s(3123),s(1017)),o=s(3242),l=s(7633),c=s(7868),u=s(417),d=s(9223),p=s(4471),f={components:{Collect:l.Z,Video:o.Z,ListIndex:c.Z,ListLove:u.Z,ListTitle:d.Z,ListDuration:p.Z},data:function(){return{activeName:"album",artistDetail:{artist:{cover:""}},topSongs:[],id:this.$route.query.id,mvs:[],artists:[],likeList:[],introduction:[]}},watch:{activeName:function(){switch(this.activeName){case"mv":this.getArtistMv();break;case"simi":this.getSimiArtists();break;case"artistDetail":this.getArtistDesc();break}},"$store.state.likeIds":function(){var t=this;this.topSongs.forEach((function(e){e.like=t.$store.state.likeIds.includes(e.id)}))}},created:function(){var t=this;this.getArtistDetail().then((function(){t.getArtistDesc()})),this.getTopSongs()},methods:{getArtistDetail:function(){var t=this;return(0,r.Z)(regeneratorRuntime.mark((function e(){var s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,(0,n.Fk)(t.id);case 2:s=e.sent,t.artistDetail=s.data;case 4:case"end":return e.stop()}}),e)})))()},getSimiArtists:function(){var t=this;return(0,r.Z)(regeneratorRuntime.mark((function e(){var s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,(0,n.ii)(t.id);case 2:s=e.sent,t.artists=s.artists;case 4:case"end":return e.stop()}}),e)})))()},getArtistMv:function(){var t=this;return(0,r.Z)(regeneratorRuntime.mark((function e(){var s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,(0,n.pU)(t.id);case 2:s=e.sent,t.mvs=s.mvs;case 4:case"end":return e.stop()}}),e)})))()},getTopSongs:function(){var t=this;return(0,r.Z)(regeneratorRuntime.mark((function e(){var s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,(0,n.DC)(t.id);case 2:s=e.sent,s.songs.forEach((function(e){e.like=t.$store.state.likeIds.includes(e.id)})),t.topSongs=s.songs;case 5:case"end":return e.stop()}}),e)})))()},getArtistDesc:function(){var t=this;return(0,r.Z)(regeneratorRuntime.mark((function e(){var s,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,(0,n.b)(t.id);case 2:s=e.sent,s.briefDesc&&(i={ti:"".concat(t.artistDetail.artist.name),txt:"".concat(s.briefDesc)},s.introduction.unshift(i)),s.introduction.forEach((function(t){t.txt=t.txt.split("\n")})),t.introduction=s.introduction;case 6:case"end":return e.stop()}}),e)})))()}}},m=f,h=s(1001),v=(0,h.Z)(m,i,a,!1,null,"c8fc7270",null),g=v.exports},4083:function(t,e,s){t.exports=s.p+"img/top50.73a1c5b0.png"}}]);
//# sourceMappingURL=574-legacy.dd9dbbbb.js.map