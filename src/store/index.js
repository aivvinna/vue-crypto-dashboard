import Vue from 'vue'
import Vuex from 'vuex'

import { user } from '@/store/modules/user'
import { coins } from '@/store/modules/coins'
import { posts } from '@/store/modules/posts'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    coins,
    posts
  },
  state: {
    loading: false,
    error: null
  },
  mutations: {
    setLoading: (state, payload) => {
      state.loading = payload
    },
    setError: (state, payload) => {
      state.error = payload
    },
    clearError: state => state.error = null
  },
  getters: {
    loading: state => state.loading,
    error: state => state.error
  }
})