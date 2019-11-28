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

//写cookies
Vue.prototype.setCookie = function (name,value)
{
var Days = 30;
var exp = new Date();
exp.setTime(exp.getTime() + Days*24*60*60*1000);
document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
//读取cookies
Vue.prototype.getCookie = function (name)
{
var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
if(arr=document.cookie.match(reg)) return unescape(arr[2]);
else return null;
}
//删除cookies
Vue.prototype.delCookie = function (name)
{
  console.log('fff')
var exp = new Date();
exp.setTime(exp.getTime() - 1);
var cval=this.getCookie(name);
if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}

function post(url, data){
  return axios({
    method: "POST",
    url: "http://localhost:80/ChinesePoker_war/" + url,
    // url: "http://47.100.79.111:8080/" + url,
    data: data,
  })
}
function get(url){
  return axios.get("http://localhost:80/ChinesePoker_war/" + url);
}

// Vue.prototype.getRecommendUsers = function(){
//   return get("api/Recommend/getRecommendUsers");
// }

Vue.prototype.login = function (data){
  return post("login/login", data);
}
Vue.prototype.register = function (data){
  return post("login/register", data);
}