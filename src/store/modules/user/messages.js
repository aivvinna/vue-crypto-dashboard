import { defaultClient as apolloClient } from '@/main'
import { GET_USERS_CONVERSED } from '@/graphql/queries'
import { SUBSCRIBE_TO_MESSAGES } from '@/graphql/subscriptions'

export const messages = {
  namespaced: true,
  state: {
    messages: [],
    usersConversed: []
  },
  mutations: {
    pushNewMessage: (state, payload) => {
      state.messages.push(payload)
    },
    setUsersConversed: (state, payload) => {
      state.usersConversed = payload
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
    getUsersConversed: async ({ commit }) => {
      try {
        const { data } = await apolloClient.query({
          query: GET_USERS_CONVERSED
        })
        console.log(data)
        commit('setUsersConversed', data.usersConversed)
      } catch(err) {
        console.error(err)
      }
    }
  },
  getters: {
    messages: state => state.messages,
    usersConversed: state => state.usersConversed
  }
}
