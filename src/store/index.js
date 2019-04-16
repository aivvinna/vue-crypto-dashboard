import Vue from 'vue'
import Vuex from 'vuex'

import { user } from '@/store/modules/user'
import { coins } from '@/store/modules/coins'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    coins,
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
