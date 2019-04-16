<template>
  <div class="posts-list">
    <template v-if="posts">
      <div v-for="post in posts" :key="post.id">
        <PostCard :post="post"/>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PostCard from '@/components/PostCard.vue'

import { GET_POSTS } from '@/graphql/queries'

export default {
  name: 'PostsList',
  components: {
    PostCard
  },
  data() {
    return {
      canGetMorePosts: true
    }
  },
  apollo: {
    posts: {
      query: GET_POSTS,
      variables: {
        first: 15,
        skip: 0
      }
    }
  },
  created() {
    this.scroll()
    console.log('this.$apollo', this.$apollo)
  },
  computed: {
    postsCount() {
      if (this.posts) {
        return this.posts.length
      }
    }
  },
  watch: {
    postsCount: function() {
      this.canGetMorePosts = true
    }
  },
  methods: {
    showMorePosts() {
      this.$apollo.queries.posts.fetchMore({
        variables: {
          first: 15,
          skip: this.postsCount
        },
        updateQuery: (prevResult, { fetchMoreResult }) => {          
          return {
            posts: [...prevResult.posts, ...fetchMoreResult.posts]
          }
        }
      })
    },
    scroll() {
      window.onscroll = () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight + 300 >= document.documentElement.offsetHeight;
        if (bottomOfWindow && this.canGetMorePosts) {
          this.showMorePosts()
          this.canGetMorePosts = false
        }
      }
    }
  }
}
</script>

<style lang="scss">
.posts-list {
  margin-top: 8px;
}
</style>
