<template>
  <div>
    <div>
      Search Result
      {{$route.params}}
    </div>
    <div class="columns">
      <div class="column">
        <div v-if="$apollo.queries.users.loading">
          loading users...
        </div>
        <div v-for="user in users" :key="user.id">
          {{user.username}}
        </div>
      </div>
      <div class="column">
        <div v-for="post in posts" :key="post.id">
          {{post.content}} {{post.category}}
        </div>
        <div v-if="$apollo.queries.posts.loading">
          loading posts...
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import { GET_POSTS_SEARCH, GET_USERS_SEARCH } from '@/graphql/queries'

export default {
  name: 'SearchResult',
  data() {
    return {
      posts: []
    }
  },
  apollo: {
    posts: {
      query: GET_POSTS_SEARCH,
      variables() {
        return {
          first: 15,
          skip: 0,
          query: this.$route.params.searchTerm
        }
      }
    },
    users: {
      query: GET_USERS_SEARCH,
      variables() {
        return {
          first: 15,
          skip: 0,
          query: this.$route.params.searchTerm
        }
      }
    }
  }
}
</script>
