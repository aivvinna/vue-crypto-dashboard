import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'

import { defaultClient as apolloClient } from './main'

import { GET_POSTS, GET_ME } from './graphql/queries'

import { LOGIN_USER } from './graphql/mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: [],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    setPosts: (state, payload) => {
      state.posts = payload
    },
    setLoading: (state, payload) => {
      state.loading = payload
    },
    setError: (state, payload) => {
      state.error = payload
    },
    setUser: (state, payload) => {
      state.user = payload
    },
    clearUser: state => state.user = null,
    clearError: state => state.error = null
  },
  actions: {
    getMe: ({ commit }) => {
      commit('setLoading', true)
      apolloClient.query({
        query: GET_ME
      }).then(({data}) => {
        commit('setLoading', false)
        commit('setUser', data.me)
        console.log(data)
      }).catch(err => {
        commit('setLoading', false)
        console.error(err)
      })
    },
    getPosts: ({ commit }) => {
      commit('setLoading', true);
      apolloClient.query({
        query: GET_POSTS
      }).then(({data}) => {
        commit('setPosts', data.posts)
        commit('setLoading', false)
        console.log('data', data)
      }).catch(err => {
        commit('setLoading', false)
        console.error(err)
      })
    },
    loginUser: ({ commit }, payload) => {
      commit('clearError')
      apolloClient.mutate({
        mutation: LOGIN_USER,
        variables: payload
      }).then(({data}) => {
        console.log('login', data)
        localStorage.setItem('token', data.login.token)
        router.go();
      }).catch(err => {
        commit('setError', err)
        console.error(err)
      })
    },
    logoutUser: async ({ commit }) => {
      commit('clearUser')
      localStorage.setItem('token', '')
      await apolloClient.resetStore()
      router.push('/')
    } 
  },
  getters: {
    posts: state => state.posts,
    user: state => state.user,
    loading: state => state.loading,
    error: state => state.error
  }
})
