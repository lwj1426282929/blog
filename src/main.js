import Vue from 'vue'
import App from './App'
import router from './router'
import http from './http'
import instance from './http/config'
import store from './store'

import MuseUI from 'muse-ui'
import 'typeface-roboto'
import Message from 'muse-ui-message'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui-message/dist/muse-ui-message.css'
import theme from 'muse-ui/lib/theme'
import 'element-ui/lib/theme-chalk/index.css'

theme.add('blog-theme', {
  primary: '#42c02e'
}, 'light')

theme.use('blog-theme')

Vue.use(MuseUI)
Vue.use(Message)

Vue.config.productionTip = false

Vue.use(http, instance)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
