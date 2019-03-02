import router from '@/router'
import { defaultClient as apolloClient } from '@/main'

import { GET_ME } from '@/graphql/queries'
import { LOGIN_USER, SIGNUP_USER, UPDATE_FAVCRYPTOS } from '@/graphql/mutations'

export const user = {
  namespaced: true,
  state: {
    user: null
  },
  mutations: {
    setUser: (state, payload) => {
      state.user = payload
    },
    clearUser: state => state.user = null,
    setFavCryptos: (state, payload) => {
      state.user.favCryptos = payload
    }
  },
  actions: {
    getMe: async ({ commit }) => {
      commit('setLoading', true, { root: true })
      try {
        const {data} = await apolloClient.query({
          query: GET_ME
        })
        commit('setLoading', false, { root: true })
        commit('setUser', data.me)
        console.log(data)
      } catch(err) {
        commit('setLoading', false, { root: true })
        console.error(err)
      }
    },
    updateFavCryptos: ({ commit }, payload) => {
      commit('setFavCryptos', payload.cryptos)
      try {
        apolloClient.mutate({
          mutation: UPDATE_FAVCRYPTOS,
          variables: payload,
        }).then(({ data }) => {
          console.log(data)
        })
      } catch(err) {
        console.error(err)
      }
    },
    loginUser: async ({ commit }, payload) => {
      commit('clearError', null, { root: true })
      commit('setLoading', true, { root: true })
      try {
        const {data} = await apolloClient.mutate({
          mutation: LOGIN_USER,
          variables: payload
        })
        console.log('login', data)
        commit('setLoading', false, { root: true })
        localStorage.setItem('token', data.login.token)
        router.go();
      } catch(err) {
        commit('setLoading', false, { root: true })
        commit('setError', err, { root: true })
        console.error(err)
      }
    },
    createUser: async ({ commit }, payload) => {
      commit('clearError', null, { root: true })
      commit('setLoading', true, { root: true })
      try {
        const {data} = await apolloClient.mutate({
          mutation: SIGNUP_USER,
          variables: payload
        })
        commit('setLoading', false, { root: true })
        localStorage.setItem('token', data.createUser.token)
        router.go()
      } catch(err) {
        commit('setLoading', false, { root: true })
        commit('setError', err, { root: true })
        console.error(err)
      }
    },
    logoutUser: async ({ commit }) => {
      commit('clearUser')
      localStorage.setItem('token', '')
      await apolloClient.resetStore()
      router.push('/')
    }
  },
  getters: {
    user: state => state.user
  }
}