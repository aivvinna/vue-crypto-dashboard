import { GET_POST } from '@/graphql/queries'
import { mapGetters } from 'vuex'
import { CREATE_POST, UPVOTE_POST, DOWNVOTE_POST, REMOVE_UPVOTE, REMOVE_DOWNVOTE } from '@/graphql/mutations'

export default {
  data() {
    return {
      replyContent: '',
      post: null
    }
  },
  apollo: {
    post: {
      query: GET_POST,
      variables() {
        return {
          id: this.$route.params.id
        }
      }
    }
  },
  computed: {
    ...mapGetters('user', ['user']),
    isUpvoted() {
      if (this.user) {
        return this.post.upvotes.some(user => user.id === this.user.id)
      }
    },
    isDownvoted() {
      if (this.user) {
        return this.post.downvotes.some(user => user.id === this.user.id)
      }
    },
    category() {
      const words = this.replyContent.split(' ')
      const filteredArray = words.filter(word => word.startsWith('#') && word.length > 1)
      return filteredArray.map(word => word.slice(1))
    }
  },
  methods: {
    goToUserProfile() {
      this.$router.push({name: 'user', params: {username: this.post.author.username}})
    },
    handleCreatePostWithParent() {
      this.$apollo.mutate({
        mutation: CREATE_POST,
        variables: {
          data: {
            content: this.replyContent,
            parentId: this.post.id,
            category: this.category
          }
        },
        update: ( cache, { data: { createPost }}) => {
          const data = cache.readQuery({
            query: GET_POST,
            variables: {
              id: this.post.id
            }
          })
          data.post.posts = [...data.post.posts, createPost]
          cache.writeQuery({
            query: GET_POST,
            variables: {
              id: this.post.id
            },
            data
          })
        },
        optimisticResponse: {
          __typename: 'Mutation',
          createPost: {
            __typename: 'Post',
            id: -1,
            content: this.replyContent,
            category: this.category,
            author: this.user,
            upvotes: [],
            downvotes: [],
            posts: [],
            createdAt: Date.now(),
            parent: this.post
          }
        }
      })

      this.replyContent = ''
      this.category = []
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
            query: GET_POST,
            variables: {
              id: this.post.id
            }
          })
          data.post.upvotes = upvotePost.upvotes
          cache.writeQuery({
            query: GET_POST,
            variables: {
              id: this.post.id
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
            query: GET_POST,
            variables: {
              id: this.post.id
            }
          })
          data.post.upvotes = removeUpvote.upvotes
          cache.writeQuery({
            query: GET_POST,
            variables: {
              id: this.post.id
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
            query: GET_POST,
            variables: {
              id: this.post.id
            }
          })
          data.post.downvotes = downvotePost.downvotes
          cache.writeQuery({
            query: GET_POST,
            variables: {
              id: this.post.id
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
            query: GET_POST,
            variables: {
              id: this.post.id
            }
          })
          data.post.downvotes = removeDownvote.downvotes
          cache.writeQuery({
            query: GET_POST,
            variables: {
              id: this.post.id
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
