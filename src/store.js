import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'

import axios from 'axios'

import { defaultClient as apolloClient } from './main'

import { GET_POSTS, GET_ME } from './graphql/queries'

import { LOGIN_USER, SIGNUP_USER, CREATE_POST } from './graphql/mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: [],
    user: null,
    loading: false,
    error: null,
    coins: [],
  },
  mutations: {
    setCoins: (state, payload) => {
      state.coins = payload
    },
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
    getCoins: ({ commit }) => {
      axios.get(`https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD`)
      .then((response) => {
        commit('setCoins', response.data.Data)
      }).catch(err => {
        console.error(err)
      })
    },
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
      commit('setLoading', true)
      apolloClient.mutate({
        mutation: LOGIN_USER,
        variables: payload
      }).then(({data}) => {
        console.log('login', data)
        commit('setLoading', false)
        localStorage.setItem('token', data.login.token)
        router.go();
      }).catch(err => {
        commit('setLoading', false)
        commit('setError', err)
        console.error(err)
      })
    },
    createUser: ({ commit }, payload) => {
      commit('clearError')
      commit('setLoading', true)
      apolloClient.mutate({
        mutation: SIGNUP_USER,
        variables: payload
      }).then(({data}) => {
        commit('setLoading', false)
        localStorage.setItem('token', data.createUser.token)
        router.go()
      }).catch(err => {
        commit('setLoading', false)
        commit('setError', err)
        console.error(err)
      })
    },
    logoutUser: async ({ commit }) => {
      commit('clearUser')
      localStorage.setItem('token', '')
      await apolloClient.resetStore()
      router.push('/')
    },
    createPost: ({ commit }, payload) => {
      console.log('createPost action')
      apolloClient.mutate({
        mutation: CREATE_POST,
        variables: payload
      }).then(({data}) => {
        console.log(data)
      }).catch(err => {
        console.error(err)
      })
    }
  },
  getters: {
    coins: state => state.coins,
    posts: state => state.posts,
    user: state => state.user,
    loading: state => state.loading,
    error: state => state.error
  }
})
