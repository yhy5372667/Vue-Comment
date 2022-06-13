import Vue from 'vue'
import App from './App.vue'
import '../src/publics/element'
import 'font-awesome/css/font-awesome.min.css'
import router from './router'
// import axios from 'axios'
// Vue.prototype.axios = axios
import service from './service'
Vue.prototype.service = service

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
