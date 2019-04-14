<template>
  <div @click.stop="openModal">
    <div class="card">
      <div class="card-content">
        <div class="columns">
          <div class="column is-1">
            <span
              class="icon is-small vote-button"
              :class="{'has-text-success': isUpvoted}"
              @click.stop.prevent="handleUpvote">
              <i class="fas fa-chevron-up"></i>
            </span>
            <br>
            <span class="icon is-small">
              {{post.upvotes.length - post.downvotes.length}}
            </span>
            <br>
            <span
              class="icon is-small vote-button"
              :class="{'has-text-danger': isDownvoted}"
              @click.stop.prevent="handleDownvote">
              <i class="fas fa-chevron-down"></i>
            </span>
          </div>
          <div class="column is-11">
            <div class="media">
              <div class="media-content">
                <p>
                  <a @click.stop.prevent="goToUserProfile">
                    <strong>{{post.author.displayName ? post.author.displayName : post.author.username}}</strong>
                    <small> {{`@${post.author.username}`}}</small> 
                  </a>
                  <small> {{new Date(post.createdAt).toLocaleString()}}</small>
                </p>
                <p class="is-italic" v-if="post.category.length !== 0">
                  <span
                    v-for="(category, i) in post.category" :key="category">
                    {{i !== 0 ? "|" : "" }}{{post.category[i]}}
                  </span>
                </p>
                <p>{{post.content}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import { UPVOTE_POST, DOWNVOTE_POST, REMOVE_UPVOTE, REMOVE_DOWNVOTE } from '@/graphql/mutations'
import { GET_POSTS } from '@/graphql/queries'

export default {
  name: 'PostCard',
  props: ['post'],
  computed: {
    ...mapGetters('user', ['user']),
    isUpvoted() {
      return this.post.upvotes.some(user => user.id === this.user.id)
    },
    isDownvoted() {
      return this.post.downvotes.some(user => user.id === this.user.id)
    }
  },
  methods: {
    openModal() {
      this.$router.push({name: 'post', params: { id: this.post.id}})
    },
    goToUserProfile() {
      this.$router.push({name: 'user', params: {username: this.post.author.username}})
    },
    handleUpvote() {
      if (this.isUpvoted) {
        this.handleRemoveUpvote()
      } else {
        this.handleUpvotePost()
      }
    },
    handleDownvote() {
      if (this.isDownvoted) {
        this.handleRemoveDownvote()
      } else {
        this.handleDownvotePost()
      }
    },
    handleUpvotePost() {
      this.$apollo.mutate({
        mutation: UPVOTE_POST,
        variables: {
          id: this.post.id
        },
        update: ( cache, { data: { upvotePost } }) => {
          const data = cache.readQuery({
            query: GET_POSTS,
            variables: {
              first: 15,
              skip: 0
            }
          })
          const postToUpvote = data.posts.find(post => post.id === this.post.id)
          postToUpvote.upvotes = upvotePost.upvotes
          cache.writeQuery({
            query: GET_POSTS,
            variables: {
              first: 15,
              skip: 0
            },
            data
          })
        },
        optimisticResponse: {
          __typename: 'Mutation',
          upvotePost: {
            __typename: 'Post',
            id: this.post.id,
            upvotes: [{ __typename: 'User', id: this.user.id }, ...this.post.upvotes],
            downvotes: this.post.downvotes.filter(user => user.id !== this.user.id)
          }
        }
      })
    },
    handleRemoveUpvote() {
      this.$apollo.mutate({
        mutation: REMOVE_UPVOTE,
        variables: {
          id: this.post.id
        },
        update: ( cache, { data: { removeUpvote } }) => {
          const data = cache.readQuery({
            query: GET_POSTS,
            variables: {
              first: 15,
              skip: 0
            }
          })
          const postToRemoveUpvote = data.posts.find(post => post.id === this.post.id)
          postToRemoveUpvote.upvotes = removeUpvote.upvotes
          cache.writeQuery({
            query: GET_POSTS,
            variables: {
              first: 15,
              skip: 0
            },
            data
          })
        },
        optimisticResponse: {
          __typename: 'Mutation',
          removeUpvote: {
            __typename: 'Post',
            id: this.post.id,
            upvotes: this.post.upvotes.filter(user => user.id !== this.user.id),
            downvotes: [...this.post.downvotes]
          }
        }
      })
    },
    handleDownvotePost() {
      this.$apollo.mutate({
        mutation: DOWNVOTE_POST,
        variables: {
          id: this.post.id
        },
        update: ( cache, { data: { downvotePost } }) => {
          const data = cache.readQuery({
            query: GET_POSTS,
            variables: {
              first: 15,
              skip: 0
            }
          })
          const postToDownvote = data.posts.find(post => post.id === this.post.id)
          postToDownvote.downvotes = downvotePost.downvotes
          cache.writeQuery({
            query: GET_POSTS,
            variables: {
              first: 15,
              skip: 0
            },
            data
          })
        },
        optimisticResponse: {
          __typename: 'Mutation',
          downvotePost: {
            __typename: 'Post',
            id: this.post.id,
            upvotes: this.post.upvotes.filter(user => user.id !== this.user.id),
            downvotes: [{ __typename: 'User', id: this.user.id }, ...this.post.downvotes]
          }
        }
      })
    },
    handleRemoveDownvote() {
      this.$apollo.mutate({
        mutation: REMOVE_DOWNVOTE,
        variables: {
          id: this.post.id
        },
        update: ( cache, { data: { removeDownvote } }) => {
          const data = cache.readQuery({
            query: GET_POSTS,
            variables: {
              first: 15,
              skip: 0
            }
          })
          const postToRemoveDownvote = data.posts.find(post => post.id === this.post.id)
          postToRemoveDownvote.downvotes = removeDownvote.downvotes
          cache.writeQuery({
            query: GET_POSTS,
            variables: {
              first: 15,
              skip: 0
            },
            data
          })
        },
        optimisticResponse: {
          __typename: 'Mutation',
          removeDownvote: {
            __typename: 'Post',
            id: this.post.id,
            upvotes: [...this.post.upvotes],
            downvotes: this.post.downvotes.filter(user => user.id !== this.user.id)
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  color: black;
  &:hover {
    color: #0000EE;
    text-decoration: underline;
  }
}

.card {
  box-shadow: none;
  border-bottom: 1px solid #e6ecf0;
  &:hover {
    background-color: #f5f8fa;
    cursor: pointer;
  }
}

.column {
  margin: 0px;
  padding: 0px;
}

.vote-button {
  cursor: pointer;
  &:hover {
    color: gray;
  }
}
</style>
