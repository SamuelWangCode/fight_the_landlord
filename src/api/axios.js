import axios from 'axios'
axios.defaults.withCredentials = true;
import VueAxios from 'vue-axios';
import Vue from 'vue'
Vue.use(VueAxios, axios)

function post(url, data) {
  return axios({
    method: "POST",
    // url: "http://localhost:80/ChinesePoker_war/" + url,
    url: "http://169.254.239.175:80/ChinesePoker_war/" + url,
    data: data,
  })
}

// function get(url) {
//   return axios.get("http://localhost:80/ChinesePoker_war/" + url);
// }

// Vue.prototype.getRecommendUsers = function(){
//   return get("api/Recommend/getRecommendUsers");
// }

function login(data) {
  return post("login/login", data);
}

function register(data) {
  return post("login/register", data);
}

function changePWD(data) {
  return post("login/changePWD", data);
}

function getUserBasicInfo(data) {
  return post("userInfo/basic", data);
}

function getUserDetailInfo(data) {
  return post("userInfo/detail", data);
}

function getGameInfo(data) {
  return post("gameInfo", data);
}

export default{
    login,
    register,
    changePWD,
    getUserBasicInfo,
    getUserDetailInfo
}