"use strict";(self["webpackChunkvue_cloudmusic"]=self["webpackChunkvue_cloudmusic"]||[]).push([[39],{1076:function(t,e,a){a.d(e,{Z:function(){return c}});var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{staticClass:"btn-wrap btn btn-red"},[a("span",{staticClass:"btn-content"},[a("svg",{staticClass:"icon icon-play",attrs:{"aria-hidden":"true"}},[a("use",{attrs:{"xlink:href":"#icon-play"}})]),t._v(" 播放全部 ")])])},n=[],i=(a(1539),a(4747),{props:{},methods:{PlayFirstSong:function(t){this.common.playMusic(t[0]),t.forEach((function(t,e){t.index=e})),this.$store.commit("setPlaylist",t)}}}),l=i,r=a(1001),o=(0,r.Z)(l,s,n,!1,null,"88fe05b0",null),c=o.exports},3901:function(t,e,a){a.r(e),a.d(e,{default:function(){return f}});var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"album-wrap"},[a("header",[t.albumInfo.blurPicUrl?a("img",{staticClass:"rounded-5 border-line",staticStyle:{width:"180px",height:"180px"},attrs:{src:t.albumInfo.blurPicUrl,alt:""}}):t._e(),a("div",{staticClass:"ml-20",staticStyle:{width:"calc(100% - 200px)"}},[a("div",{staticClass:"align-center hidden-1"},[a("Label",{staticClass:"mr-10 default",attrs:{large:!0}},[t._v("专辑")]),a("span",{staticClass:"font-23 bold"},[t._v(t._s(t.albumInfo.name)),0!==t.albumInfo.alias.length?a("span",{staticStyle:{color:"#9f9f9f"}},[t._v(" ("+t._s(t.albumInfo.alias[0])+")")]):t._e()])],1),a("div",{staticClass:"my-10 align-center"},[a("Play-Button",{ref:"playBtnRef",staticClass:"mr-20",nativeOn:{click:function(e){return t.PlayAllSongs.apply(null,arguments)}}}),a("Collect-Button",{attrs:{subCount:t.subCount,id:t.id,type:"album"}})],1),a("div",{staticClass:"tags-box"},[a("span",{staticStyle:{display:"block"}},[t._v("歌手 :"),t.albumInfo.artist?a("span",{staticClass:"deep-link",on:{click:function(e){return t.common.toArtist(t.albumInfo.artist.id)}}},[t._v(" "+t._s(t.albumInfo.artist.name))]):t._e()])]),a("div",{staticClass:"my-10"},[a("span",[t._v("时间 : "),a("span",{staticClass:"deeper-gray default"},[t._v(t._s(t._f("dateFormat")(t.albumInfo.publishTime)))])])])])]),a("div",{staticClass:"tab-wrap"},[a("el-tabs",{model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"歌曲列表",name:"songList"}},[a("Music-List",{attrs:{songs:t.playlists}},[a("el-table-column",{attrs:{label:"热度"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("el-progress",{attrs:{percentage:t.row.pop,color:"#c8c8c8","show-text":!1}})]}}])})],1)],1),a("el-tab-pane",{attrs:{label:"评论("+t.commentCount+")",name:"comment"}},[a("Comment",{staticStyle:{padding:"0 30px"},attrs:{id:t.id,type:3},on:{getCommentCount:t.getCommentCount}})],1),a("el-tab-pane",{attrs:{label:"专辑详情",name:"detail"}},[a("p",{staticClass:"deeper-gray des"},[t._v(" "+t._s(t.albumInfo.description)+" ")])])],1)],1)])},n=[],i=a(6198),l=(a(8975),a(1539),a(4747),a(6699),a(2023),a(5098)),r=a(7233),o=a(9033),c=a(1076),u={components:{MusicList:r.Z,Label:o.Z,PlayButton:c.Z},data:function(){return{activeName:"songList",albumInfo:{alias:[]},playlists:[],subCount:"",id:this.$route.params.id,commentCount:0}},watch:{$route:function(){this.id=this.$route.params.id,this.getAlbumDetail()},"$store.state.likeIds":function(){var t=this;this.playlists.forEach((function(e){e.like=t.$store.state.likeIds.includes(e.id)}))}},computed:{},created:function(){this.getAlbumDetail(),this.getAlbumDetailDynamic()},methods:{getAlbumDetail:function(){var t=this;return(0,i.Z)(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,(0,l.Ao)(t.id);case 2:a=e.sent,a.songs.forEach((function(e){e.like=t.$store.state.likeIds.includes(e.id)})),t.albumInfo=a.album,t.playlists=a.songs;case 6:case"end":return e.stop()}}),e)})))()},getAlbumDetailDynamic:function(){var t=this;return(0,i.Z)(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,(0,l.g7)(t.id);case 2:a=e.sent,t.subCount=a.subCount;case 4:case"end":return e.stop()}}),e)})))()},PlayAllSongs:function(){this.$refs.playBtnRef.PlayFirstSong(this.playlists)},getCommentCount:function(t){this.commentCount=t}}},m=u,d=a(1001),p=(0,d.Z)(m,s,n,!1,null,"462c5454",null),f=p.exports}}]);
//# sourceMappingURL=39-legacy.f973ff3d.js.map