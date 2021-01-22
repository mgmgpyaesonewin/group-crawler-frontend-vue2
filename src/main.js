import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VuetifyDatetimePicker from './plugins/vuetify-datetime-picker';
import "@/plugins/Dayjs";
import router from './router'
import './index.css'

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  VuetifyDatetimePicker,
  render: h => h(App)
}).$mount('#app')
