import Vue from 'vue'

// 媒体时间格式化
Vue.filter('timeFormat', function (originVal) {
  const date = new Date(originVal)
  const mm = (date.getMinutes() + '').padStart(2, '0')
  const ss = (date.getSeconds() + '').padStart(2, '0')
  return `${mm}:${ss}`
})
//媒体播放量格式化
Vue.filter('playCountFormat', function (originVal) {
  if (originVal > 10000) {
    return Math.floor(originVal / 10000) + '万'
  }
  return originVal
})
// 媒体时间格式化
Vue.filter('dateFormat', function (originVal) {
  const date = new Date(originVal)
  const yy = date.getFullYear()
  const mm = (date.getMonth() + 1 + '').padStart(2, '0')
  const dd = (date.getDate() + '').padStart(2, '0')
  return `${yy}-${mm}-${dd}`
})
