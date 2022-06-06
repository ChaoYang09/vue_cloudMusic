"use strict";(self["webpackChunkvue_cloudmusic"]=self["webpackChunkvue_cloudmusic"]||[]).push([[43],{5624:function(t,e,s){s.d(e,{Z:function(){return u}});var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"table-wrap"},[s("el-table",{attrs:{width:"100%",data:t.tableData,stripe:"","show-header":!1,"row-style":t.rowStyle},on:{"row-click":t.togoPage}},[s("el-table-column",{attrs:{width:"100px"},scopedSlots:t._u([{key:"default",fn:function(t){return[s("img",{staticClass:"rounded-5 block ml-20",staticStyle:{width:"55px",height:"55px"},attrs:{src:t.row.picUrl?t.row.picUrl:t.row.coverImgUrl,alt:""}})]}}])}),s("el-table-column",{attrs:{prop:"name","min-width":"300"}}),10===t.type?s("el-table-column",{attrs:{"min-width":"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.artist?s("span",{staticClass:"deep-gray",on:{click:function(s){return t.common.toArtist(e.row.artist.id)}}},[t._v(t._s(e.row.artist.name))]):t._e()]}}],null,!1,2961609818)}):t._e(),1009===t.type?s("el-table-column",{attrs:{"min-width":"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.dj?s("span",{staticClass:"deep-gray"},[s("span",{staticClass:"light-gray"},[t._v("by ")]),s("span",{on:{click:function(s){return t.common.toUser(e.row.dj.userId)}}},[t._v(t._s(e.row.dj.nickname))])]):t._e()]}}],null,!1,3932369914)}):t._e(),t._t("default"),1e3===t.type?s("el-table-column",{attrs:{"min-width":"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",{staticClass:"gray"},[t._v(t._s(e.row.trackCount)+"首")])]}}],null,!1,2913403196)}):t._e(),1e3===t.type?s("el-table-column",{attrs:{"min-width":"250"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.creator?s("span",{staticClass:"deep-gray"},[s("span",{staticClass:"light-gray"},[t._v("by ")]),s("span",{on:{click:function(s){return t.common.toUser(e.row.creator.userId)}}},[t._v(t._s(e.row.creator.nickname))])]):t._e()]}}],null,!1,2024346888)}):t._e()],2),s("div",{staticClass:"flex-center mt-10"},[t.pagination?s("el-pagination",{attrs:{small:"",background:"",layout:"prev, pager, next",total:t.count,"page-size":30,"current-page":t.currentPage},on:{"current-change":t.handleCurrentChange}}):t._e()],1)],1)},i=[],r=s(4665),n={props:{tableData:{type:Array,default:()=>{},require:!0},count:{type:Number},type:{type:[Number,String]},pagination:{type:Boolean}},data(){return{currentPage:1}},methods:{...(0,r.OI)(["setOffset"]),handleCurrentChange(t){switch(this.currentPage=t,this.setOffset(30*(t-1)),this.type){case 10:this.$parent.getAlbums();break;case 100:this.$parent.getArtists();break;case 1e3:this.$parent.getPlaylists();break;case 1002:this.$parent.getUsers();break;case 1009:this.$parent.getDjRadios();break;case 1014:this.$parent.getVideos();break}},togoPage(t){switch(this.type){case 10:this.common.toAlbumList(t.id);break;case 100:this.common.toArtist(t.id);break;case 1e3:this.common.toSongsList(t.id);break;case 1002:this.getUsers();break;case 1009:this.common.toDjList(t.id);break;case 1014:this.getVideos();break}},rowStyle(){return"cursor: pointer "}}},o=n,c=s(1001),l=(0,c.Z)(o,a,i,!1,null,"22cd05a0",null),u=l.exports},3242:function(t,e,s){s.d(e,{Z:function(){return l}});var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"video-content"},[s("div",{staticClass:"position"},[s("img",{staticClass:"rounded-5",attrs:{src:t.url,alt:""}}),0!==t.duration?s("span",{staticClass:"durations"},[t._v(t._s(t._f("timeFormat")(t.duration)))]):t._e(),s("span",{staticClass:"count"},[s("svg",{staticClass:"icon icon-right-triangle",attrs:{"aria-hidden":"true"}},[s("use",{attrs:{"xlink:href":"#icon-triangle"}})]),t._v(t._s(t._f("playCountFormat")(t.count)))])]),s("span",{staticClass:"hidden-1 block my-5"},[t._t("default"),t._v(" "+t._s(t.name))],2),t._t("author")],2)},i=[],r={props:{name:{type:String,require:!0},url:{type:String,require:!0},count:{type:[Number,String],require:!0},duration:{type:Number,default:0}},computed:{}},n=r,o=s(1001),c=(0,o.Z)(n,a,i,!1,null,"6d30f0b7",null),l=c.exports},2658:function(t,e,s){s.r(e),s.d(e,{default:function(){return f}});var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"search-wrap"},[s("header",[s("div",{staticClass:"font-15 bold"},[t._v(" 找到 "+t._s(t.count)+" "+t._s(t.measure[t.type])+t._s(t.tag[t.type])+" ")])]),s("main",[s("ul",{staticClass:"tag-wrap"},[s("li",{class:{selected:1===t.type},on:{click:function(e){t.type=1}}},[t._v("单曲")]),s("li",{class:{selected:100===t.type},on:{click:function(e){t.type=100}}},[t._v("歌手")]),s("li",{class:{selected:10===t.type},on:{click:function(e){t.type=10}}},[t._v("专辑")]),s("li",{class:{selected:1014===t.type},on:{click:function(e){t.type=1014}}},[t._v("视频")]),s("li",{class:{selected:1e3===t.type},on:{click:function(e){t.type=1e3}}},[t._v("歌单")]),s("li",{class:{selected:1009===t.type},on:{click:function(e){t.type=1009}}},[t._v(" 主播电台 ")])])]),s("footer",[1===t.type?s("section",[s("Music-List",{ref:"musicList",attrs:{songs:t.songs,count:t.count,offset:t.offset}},[s("el-table-column",{attrs:{label:"热度"},scopedSlots:t._u([{key:"default",fn:function(t){return[s("el-progress",{attrs:{percentage:t.row.pop,color:"#c8c8c8","show-text":!1}})]}}],null,!1,715272172)})],1),s("div",{staticClass:"flex-center mt-20"},[0!==t.songs.length?s("el-pagination",{ref:"paginationRef",attrs:{background:"",layout:"prev, pager, next",total:t.count,"page-size":30,"current-page":t.currentPage},on:{"current-change":t.handleCurrentChange}}):t._e()],1)],1):t._e(),s("section",{directives:[{name:"show",rawName:"v-show",value:100===t.type,expression:"type === 100"}]},[s("Table",{attrs:{tableData:t.artists,count:t.count,type:t.type}})],1),s("section",{directives:[{name:"show",rawName:"v-show",value:10===t.type,expression:"type === 10"}]},[s("Table",{attrs:{tableData:t.albums,count:t.count,type:t.type}})],1),s("section",{directives:[{name:"show",rawName:"v-show",value:1014===t.type,expression:"type === 1014"}]},[s("div",{staticClass:"video-wrap"},t._l(t.videos,(function(e,a){return s("Video",{key:a,staticClass:"video",attrs:{count:e.playTime,duration:e.durationms,url:e.coverUrl,name:e.title},nativeOn:{click:function(s){return t.common.toVideoPlayer(e.vid)}},scopedSlots:t._u([{key:"author",fn:function(){return[s("div",{staticClass:"hidden-1"},t._l(e.creator,(function(e,a){return s("span",{key:a,staticClass:"artist-list"},[s("span",{staticClass:"pointer deep-gray",on:{click:function(s){return s.stopPropagation(),t.common.toArtist(e.userId)}}},[t._v(t._s(e.userName))])])})),0)]},proxy:!0}],null,!0)},[0===e.type?s("Label",{attrs:{small:!0}},[t._v("MV")]):t._e()],1)})),1)]),s("section",{directives:[{name:"show",rawName:"v-show",value:1e3===t.type,expression:"type === 1000"}]},[s("Table",{attrs:{tableData:t.playlists,count:t.count,type:t.type}})],1),s("section",{directives:[{name:"show",rawName:"v-show",value:1009===t.type,expression:"type === 1009"}]},[s("Table",{attrs:{tableData:t.djRadios,count:t.count,type:t.type}})],1)])])},i=[],r=s(4665),n=s(7233),o=s(5624),c=s(3242),l=s(9033),u=s(2705),d={components:{MusicList:n.Z,Table:o.Z,Video:c.Z,Label:l.Z},data(){return{songs:[],artists:[],albums:[],videos:[],playlists:[],djRadios:[],count:0,type:1,likeList:[],currentPage:1,offset:0,tag:{1:"单曲",100:"歌手",10:"专辑",1014:"视频",1e3:"歌单",1009:"电台"},measure:{1:"首",100:"位",10:"张",1014:"个",1e3:"个",1009:"个"},keywords:this.$route.params.keywords}},computed:{...(0,r.rn)(["likeIds"])},mounted(){this.$store.state.paginationRef=this.$refs.paginationRef},created(){this.getSongsLists()},watch:{type(){switch(this.type){case 1:this.getSongsLists();break;case 10:this.getAlbums();break;case 100:this.getArtists();break;case 1e3:this.getPlaylists();break;case 1002:this.getUsers();break;case 1009:this.getDjRadios();break;case 1014:this.getVideos();break}},$route(){this.keywords=this.$route.params.keywords,this.getSongsLists()},likeIds(){this.songs.forEach((t=>{t.like=this.likeIds.includes(t.id)}))}},methods:{...(0,r.OI)(["upDataLikeState"]),async getSongsLists(){await(0,u.fT)({keywords:this.keywords,limit:30,offset:this.offset,type:this.type}).then((t=>{this.count=t.result.songCount,t.result.songs.forEach((t=>{t.like=this.likeIds.includes(t.id)})),this.songs=t.result.songs}))},async getArtists(){const t=await(0,u.fT)({keywords:this.keywords,limit:30,offset:this.offset,type:this.type});this.artists=t.result.artists,this.count=t.result.artistCount},async getAlbums(){const t=await(0,u.fT)({keywords:this.keywords,limit:30,offset:this.offset,type:this.type});this.albums=t.result.albums,this.count=t.result.albumCount},async getVideos(){const t=await(0,u.fT)({keywords:this.keywords,limit:30,offset:this.offset,type:this.type});this.videos=t.result.videos,console.log(this.videos),this.count=t.result.videoCount},async getPlaylists(){const t=await(0,u.fT)({keywords:this.keywords,limit:30,offset:this.offset,type:this.type});this.playlists=t.result.playlists,this.count=t.result.playlistCount},async getDjRadios(){const t=await(0,u.fT)({keywords:this.keywords,limit:30,offset:this.offset,type:this.type});this.djRadios=t.result.djRadios,this.count=t.result.djRadiosCount},handleCurrentChange(t){this.currentPage=t,this.offset=30*(t-1),this.getSongsLists(),this.$store.commit("setPageNum",t)}}},p=d,h=s(1001),y=(0,h.Z)(p,a,i,!1,null,"3c5d9173",null),f=y.exports},2705:function(t,e,s){s.d(e,{Kl:function(){return n},Qk:function(){return r},fT:function(){return i}});var a=s(2962);const i=({keywords:t,limit:e,offset:s,type:i})=>(0,a.Z)("/cloudsearch",{keywords:t,limit:e,offset:s,type:i}),r=({keywords:t})=>(0,a.Z)("/search/suggest",{keywords:t}),n=()=>(0,a.Z)("/search/hot/detail")}}]);
//# sourceMappingURL=43.54f6f6f7.js.map