import { defaultClient as apolloClient } from '@/main'
import { SUBSCRIBE_TO_MESSAGES } from '@/graphql/subscriptions'

export const messages = {
  namespaced: true,
  state: {
    messages: []
  },
  mutations: {
    pushNewMessage: (state, payload) => {
      state.messages.push(payload)
    }
  },
  actions: {
    listenToMessages: async ({ commit }) => {
      try {
        apolloClient.subscribe({
          query: SUBSCRIBE_TO_MESSAGES,
        }).subscribe({
          next(data) {
            commit('pushNewMessage', data.data.message.node)
          },
          error(err) {
            console.error(err)
          }
        })
      } catch(err) {
        console.error(err)
      }
    },
  },
  getters: {
    messages: state => state.messages
  }
}
