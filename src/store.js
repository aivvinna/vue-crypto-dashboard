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
    getCoins: async ({ commit }) => {
      try {
        const response = await axios.get(`https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD`)
        commit('setCoins', response.data.Data)
      } catch(err) {
        console.error(err)
      }
    },
    getMe: async ({ commit }) => {
      commit('setLoading', true)
      try {
        const {data} = await apolloClient.query({
          query: GET_ME
        })
        commit('setLoading', false)
        commit('setUser', data.me)
        console.log(data)
      } catch(err) {
        commit('setLoading', false)
        console.error(err)
      }
    },
    getPosts: async ({ commit }) => {
      commit('setLoading', true)
      try {
        const {data} = await apolloClient.query({
          query: GET_POSTS
        })
        commit('setPosts', data.posts)
        commit('setLoading', false)
        console.log('data', data)
      } catch(err) {
        commit('setLoading', false)
        console.error(err)
      }
    },
    loginUser: async ({ commit }, payload) => {
      commit('clearError')
      commit('setLoading', true)
      try {
        const {data} = await apolloClient.mutate({
          mutation: LOGIN_USER,
          variables: payload
        })
        console.log('login', data)
        commit('setLoading', false)
        localStorage.setItem('token', data.login.token)
        router.go();
      } catch(err) {
        commit('setLoading', false)
        commit('setError', err)
        console.error(err)
      }
    },
    createUser: async ({ commit }, payload) => {
      commit('clearError')
      commit('setLoading', true)
      try {
        const {data} = await apolloClient.mutate({
          mutation: SIGNUP_USER,
          variables: payload
        })
        commit('setLoading', false)
        localStorage.setItem('token', data.createUser.token)
        router.go()
      } catch(err) {
        commit('setLoading', false)
        commit('setError', err)
        console.error(err)
      }
    },
    logoutUser: async ({ commit }) => {
      commit('clearUser')
      localStorage.setItem('token', '')
      await apolloClient.resetStore()
      router.push('/')
    },
    createPost: ({ commit, rootState }, payload) => {
      try {
        apolloClient.mutate({
          mutation: CREATE_POST,
          variables: payload,
          update: (cache, { data: { createPost } }) => {
            const data = cache.readQuery({ query: GET_POSTS });
            data.posts.unshift(createPost)
            cache.writeQuery({
              query: GET_POSTS,
              data
            })
            commit('setPosts', data.posts)
          },
          optimisticResponse: {
            __typename: 'Mutation',
            createPost: {
              __typename: 'Post',
              id: -1,
              content: payload.data.content,
              category: payload.data.category.set,
              author: rootState.user,
              posts: [],
              createdAt: Date.now(),
              parent: null
            }
          }
        }).then(({data}) => {
          console.log(data.createPost)
        })
      } catch(err) {
        console.error(err)
      }
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
