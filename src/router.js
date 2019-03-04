import Vue from 'vue'
import Router from 'vue-router'

import AuthGuard from './AuthGuard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path:'/signup',
      name: 'signup',
      component: () => import('./views/Signup.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('./views/Profile.vue'),
      beforeEnter: AuthGuard
    },
    {
      path: '/user/:username',
      name: 'user',
      component: () => import('./views/User.vue')
    }
  ]
})
