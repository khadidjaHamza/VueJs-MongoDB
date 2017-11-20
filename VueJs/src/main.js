import Vue from 'vue'
import App from './App'

import Vuex from 'vuex'
Vue.use(Vuex)

import router from './pages/routes/AppRoutes'

window.bus = new Vue()

new Vue({
  el: '#app',
  router, 
  render: h => h(App)
})
