import { defaultClient as apolloClient } from '@/main'
import { GET_USERS_CONVERSED, GET_MESSAGES } from '@/graphql/queries'
import { CREATE_MESSAGE } from '@/graphql/mutations'
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
    setGetMessages: (state, payload) => {
      payload.forEach(message => {
        if (!state.messages.some(mes => mes.id === message.id)) {
          state.messages.push(message)
        }
      })
    },
    setMessages: (state, payload) => {
      state.messages = payload
    },
    setUsersConversed: (state, payload) => {
      state.usersConversed = payload
    }
  },
  actions: {
    listenToMessages: async ({ commit }) => {
      console.log('initiating subscribtion to messages')
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
    getMessages: async ({ commit }, payload) => {
      console.log('getting messages')
      try {
        const { data } = await apolloClient.query({
          query: GET_MESSAGES,
          variables: {
            otherUserId: payload
          }
        })
        console.log('data', data)
        commit('setGetMessages', data.messages)
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
    },
    createMessage: ({ commit, rootState }, payload) => {
      try {
        apolloClient.mutate({
          mutation: CREATE_MESSAGE,
          variables: {
            data: {
              content: payload.content,
              receiverId: payload.receiver.id
            }
          },
          update: (cache, { data: { createMessage } }) => {
            const data = cache.readQuery({ query: GET_MESSAGES, variables: { otherUserId: payload.receiver.id} });
            data.messages.push(createMessage)
            cache.writeQuery({
              query: GET_MESSAGES,
              data
            })

            // optimistic response when creating message
            const currentMessages = rootState.user.messages.messages.filter(message => message.id !== -1)
            currentMessages.push(createMessage)
            commit('setMessages', currentMessages)
          },
          optimisticResponse: {
            __typename: 'Mutation',
            createMessage: {
              __typename: 'Message',
              id: -1,
              content: payload.content,
              author: rootState.user.user,
              receiver: payload.receiver,
              createdAt: Date.now(),
            }
          }
        }).then(({data}) => {
          console.log(data)
        })
      } catch(err) {
        console.error(err)
      }
    },
  },
  getters: {
    messages: state => state.messages,
    usersConversed: state => state.usersConversed
  }
}
