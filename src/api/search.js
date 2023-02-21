import get from '@/service/get'
//type :
// 1: 单曲,
//  10: 专辑,
//  100: 歌手,
//  1000: 歌单,
//   1002: 用户,
//    1004: MV,
//     1006: 歌词,
//     1009: 电台,
//      1014: 视频,
//      1018:综合,
//       2000:声音
export const getCloudSearch = ({ keywords, limit, offset, type }) =>
  get('/cloudsearch', { keywords, limit, offset, type })

// 请求搜索建议数据
export const getSuggestionInfo = ({ keywords }) =>
  get('/search/suggest', { keywords })

// 请求热搜榜数据
export const getHotSearch = () => get('/search/hot/detail')
