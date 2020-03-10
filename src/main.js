import Vue from 'vue'
import App from './App.vue'
import VueSocketIO from 'vue-socket.io'

Vue.config.productionTip = false

Vue.use(new VueSocketIO({
  debug: false,
  connection: 'https://www.feizhouxianyu.cn:9090'
}))

new Vue({
  render: h => h(App),
}).$mount('#app')
