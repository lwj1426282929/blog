import Vue from 'vue'
import App from './App'
import router from './router'
import http from './http'
import instance from './http/config'

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
