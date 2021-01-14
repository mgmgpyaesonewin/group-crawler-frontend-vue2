import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import './index.css'

Vue.config.productionTip = false
console.log(router);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
