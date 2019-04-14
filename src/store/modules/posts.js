import { defaultClient as apolloClient } from '@/main'
import { GET_POSTS, GET_POST } from '@/graphql/queries'
import { CREATE_POST, UPVOTE_POST, DOWNVOTE_POST, REMOVE_UPVOTE, REMOVE_DOWNVOTE } from '@/graphql/mutations'

import gql from 'graphql-tag'

export const posts = {
  namespaced: true,
  state: {
    posts: []
  },
  mutations: {
    setPosts: (state, payload) => {
      payload.forEach(post => {
        state.posts.push(post)
      })
    },
    replacePosts: (state, payload) => {
      state.posts = payload
    },
    setPost: (state, payload) => {
      const index = state.posts.findIndex(post => post.id === payload.id)
      state.posts[index] = payload
    }
  },
  actions: {
    getPosts: async ({ commit, rootState }, payload) => {
      // commit('setLoading', true, { root: true })
      try {
        const {data} = await apolloClient.query({
          query: GET_POSTS,
          variables: payload
        })
        commit('setPosts', data.posts)
        // commit('setLoading', false, { root: true })
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
            console.log('createPost', createPost)
            console.log('cache', cache)
            const data = cache.readQuery({ query: GET_POSTS, variables: {first: 15, skip: 0} })
            console.log('data', data)
            data.posts.unshift(createPost)
            cache.writeQuery({
              query: GET_POSTS,
              variables: {first: 15, skip: 0},
              data
            })

            // optimistic response when creating post
            // const currentPosts = rootState.posts.posts.filter(post => post.id !== -1)
            // currentPosts.unshift(createPost)
            // commit('replacePosts', currentPosts)
          },
          optimisticResponse: {
            __typename: 'Mutation',
            createPost: {
              __typename: 'Post',
              id: -1,
              content: payload.data.content,
              category: payload.data.category.set,
              author: rootState.user.user,
              upvotes: [],
              downvotes: [],
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
    },
    upvotePost: ({commit, rootState}, payload) => {
      try {
        apolloClient.mutate({
          mutation: UPVOTE_POST,
          variables: payload,
          update: (cache, { data: { upvotePost }}) => {
            const post = rootState.posts.posts.find(post => post.id === upvotePost.id)
            post.downvotes = post.downvotes.filter(user => user.id !== rootState.user.user.id)
            post.upvotes = post.upvotes.filter(user => user.id !== rootState.user.user.id)
            post.upvotes = [...post.upvotes, rootState.user.user]
            commit('setPost', post)
          },
          optimisticResponse: {
            __typename: 'Mutation',
            upvotePost: {
              __typename: 'Post',
              id: payload.id
            }
          }
        }).then(({data}) => {
          console.log(data)
        })
      } catch(err) {
        console.error(err)
      }
    },
    downvotePost: ({commit, rootState}, payload) => {
      try {
        apolloClient.mutate({
          mutation: DOWNVOTE_POST,
          variables: payload,
          update: (cache, { data: { downvotePost }}) => {
            const post = rootState.posts.posts.find(post => post.id === downvotePost.id)
            post.upvotes = post.upvotes.filter(user => user.id !== rootState.user.user.id)
            post.downvotes = post.downvotes.filter(user => user.id !== rootState.user.user.id)
            post.downvotes = [...post.downvotes, rootState.user.user]
            commit('setPost', post)
          },
          optimisticResponse: {
            __typename: 'Mutation',
            downvotePost: {
              __typename: 'Post',
              id: payload.id
            }
          }
        }).then(({data}) => {
          console.log(data)
        })
      } catch(err) {
        console.error(err)
      }
    },
    removeUpvote: ({commit, rootState}, payload) => {
      try {
        apolloClient.mutate({
          mutation: REMOVE_UPVOTE,
          variables: payload,
          update: (cache, { data: {removeUpvote }}) => {
            const post = rootState.posts.posts.find(post => post.id === removeUpvote.id)
            post.upvotes = post.upvotes.filter(user => user.id !== rootState.user.user.id)
            commit('setPost', post)
          },
          optimisticResponse: {
            __typename: 'Mutation',
            removeUpvote: {
              __typename: 'Post',
              id: payload.id
            }
          }
        }).then(({data}) => {
          console.log(data)
        })
      } catch(err) {
        console.error(err)
      }
    },
    removeDownvote: ({commit, rootState}, payload) => {
      try {
        apolloClient.mutate({
          mutation: REMOVE_DOWNVOTE,
          variables: payload,
          update: (cache, { data: {removeDownvote}}) => {
            const post = rootState.posts.posts.find(post => post.id === removeDownvote.id)
            post.downvotes = post.downvotes.filter(user => user.id !== rootState.user.user.id)
            commit('setPost', post)
          },
          optimisticResponse: {
            __typename: 'Mutation',
            removeDownvote: {
              __typename: 'Post',
              id: payload.id
            }
          }
        }).then(({data}) => {
          console.log(data)
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
