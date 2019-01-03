import Vue from 'vue'
import Vuex from 'vuex'

import { gql } from 'apollo-boost'
import { defaultClient as apolloClient } from './main'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: []
  },
  mutations: {
    setPosts: (state, payload) => {
      state.posts = payload
    }
  },
  actions: {
    getPosts: ({ commit }) => {
      apolloClient.query({
        query: gql`query {
          posts {
            id
            title
            body
          }
        }`
      }).then(({data}) => {
        commit('setPosts', data.posts)
        console.log('data', data)
      }).catch(err => {
        console.error(err)
      })
    }
  },
  getters: {
    posts: state => state.posts
  }
})
