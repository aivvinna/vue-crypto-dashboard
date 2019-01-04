import Vue from 'vue'
import Vuex from 'vuex'

import { defaultClient as apolloClient } from './main'

import { GET_POSTS } from './graphql/queries'

import { LOGIN_USER } from './graphql/mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: [],
    loading: false
  },
  mutations: {
    setPosts: (state, payload) => {
      state.posts = payload
    },
    setLoading: (state, payload) => {
      state.loading = payload
    }
  },
  actions: {
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
      apolloClient.mutate({
        mutation: LOGIN_USER,
        variables: payload
      }).then(({data}) => {
        console.log('login', data)
      }).catch(err => {
        console.error(err)
      })
    }
  },
  getters: {
    posts: state => state.posts,
    loading: state => state.loading
  }
})
