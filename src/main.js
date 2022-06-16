import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/* 引入公共js*/
import common from '@/utils/common'
Vue.prototype.common = common

/* 引入全局过滤器*/
import '@/utils/filters'

import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./assets/images/404.png'),
  loading: require('./assets/images/loading.gif'),
  attempt: 5,
})

// import Scroll from './components/Scroll.vue'
// Vue.component('Scroll', Scroll)

// import './plugins/element.js'
// 引入全局样式
import './css/global.css'
import './css/customize.css'
import './css/magic_element.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 注册全局组件
import Collect from './components/button/Collect-Button.vue'
Vue.component('CollectButton', Collect)
import Comment from './components/comment/Comment.vue'
Vue.component('Comment', Comment)

//导入iconFont图标文件
import './assets/icons/iconfont.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
// export default Vue
