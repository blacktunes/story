import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
// import VueSocketIO from 'vue-socket.io'
import router from './router'

Vue.config.productionTip = false

// Vue.use(new VueSocketIO({
//   debug: false,
//   connection: 'https://www.feizhouxianyu.cn:9090'
// }))

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
