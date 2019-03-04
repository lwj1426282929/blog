import Vue from 'vue'
import App from './App'
import router from './router'
import http from './http'
import instance from './http/config'

import MuseUI from 'muse-ui'
import Message from 'muse-ui-message'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui-message/dist/muse-ui-message.css'
Vue.use(MuseUI)
Vue.use(Message)

Vue.config.productionTip = false

Vue.use(http, instance)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
