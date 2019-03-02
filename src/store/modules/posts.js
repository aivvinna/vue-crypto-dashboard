import { defaultClient as apolloClient } from '@/main'
import { GET_POSTS } from '@/graphql/queries'
import { CREATE_POST } from '@/graphql/mutations'

export const posts = {
  namespaced: true,
  state: {
    posts: []
  },
  mutations: {
    setPosts: (state, payload) => {
      state.posts = payload
    }
  },
  actions: {
    getPosts: async ({ commit }) => {
      commit('setLoading', true, { root: true })
      try {
        const {data} = await apolloClient.query({
          query: GET_POSTS
        })
        commit('setPosts', data.posts)
        commit('setLoading', false, { root: true })
        console.log('data', data)
      } catch(err) {
        commit('setLoading', false, { root: true })
        console.error(err)
      }
    },
    createPost: ({ commit, rootState }, payload) => {
      try {
        apolloClient.mutate({
          mutation: CREATE_POST,
          variables: payload,
          update: (cache, { data: { createPost } }) => {
            const data = cache.readQuery({ query: GET_POSTS });
            data.posts.unshift(createPost)
            cache.writeQuery({
              query: GET_POSTS,
              data
            })
            commit('setPosts', data.posts)
          },
          optimisticResponse: {
            __typename: 'Mutation',
            createPost: {
              __typename: 'Post',
              id: -1,
              content: payload.data.content,
              category: payload.data.category.set,
              author: rootState.user.user,
              posts: [],
              createdAt: Date.now(),
              parent: null
            }
          }
        }).then(({data}) => {
          console.log(data.createPost)
        })
      } catch(err) {
        console.error(err)
      }
    }
  },
  getters: {
    posts: state => state.posts
  }
}