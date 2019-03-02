import axios from 'axios'

export const coins = {
  namespaced: true,
  state: {
    coins: []
  },
  mutations: {
    setCoins: (state, payload) => {
      state.coins = payload
    }
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
  },
  getters: {
    coins: state => state.coins
  }
}