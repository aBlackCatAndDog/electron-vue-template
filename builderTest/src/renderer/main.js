import Vue from 'vue'
// import axios from 'axios'

import App from './App'
import router from './router'
import store_ from './store'
import api from './http/index';
import store from 'store';
import iView from "iview";
import 'iview/dist/styles/iview.css';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
// Vue.http = Vue.prototype.$http = axios
Vue.prototype.$store = store;
// Vue.use(VueLocalStorage)
Vue.config.productionTip = false

Vue.use(iView);
Vue.use(api);

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store_,
  template: '<App/>'
}).$mount('#app')
