import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login'
import Register from '@/pages/register'
import Hall from '@/pages/hall'
import Information from '@/pages/information'
import GameRoom from '@/pages/gameRoom'

Vue.use(Router)

// 这里写路由
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login', alias:'/',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/hall',
      name: 'Hall',
      component: Hall
    },
    {
      path: '/information',
      name: 'Information',
      component: Information
    },
    {
      path: '/gameRoom',
      name: 'GameRoom',
      component: GameRoom
    }
  ]
})
