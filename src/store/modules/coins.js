import apiFactory from '@/api/apiFactory'
const cryptoCompareApi = apiFactory.get('cryptoCompare')

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
        const response = await cryptoCompareApi.getTopCryptos()
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