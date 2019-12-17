// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
axios.defaults.withCredentials = true;
import VueAxios from 'vue-axios'
import ViewUI from 'view-design'
import store from './store'
// WebSocket封装方法
import * as socketApi from './api/websocket'
Vue.prototype.socketApi = socketApi
import 'view-design/dist/styles/iview.css';

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(ViewUI, {
  transfer: true,
  select: {
      arrowSize: 0
  }
});

router.beforeEach((to, from, next) => {
  ViewUI.LoadingBar.start();
  next();
});

router.afterEach(route => {
  ViewUI.LoadingBar.finish();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})

export default{
  methods: {
    getConfigResult (res) {
      // 接收回调函数返回数据的方法
      console.log(res)
    },
    websocketToLogin () {
      // 【agentData：发送的参数；this.getConfigResult：回调方法】
      this.socketApi.sendSock(getPlaceRevenue, this.getConfigResult)
    }
  }
}