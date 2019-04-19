<template>
  <div>
    Search Result
    {{$route.params}}
    <div v-for="post in posts" :key="post.id">
      {{post.content}} {{post.category}}
    </div>
    <div v-if="$apollo.loading">
      loading...
    </div>
  </div>
</template>

<script>
import { GET_POSTS_SEARCH } from '@/graphql/queries'

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
    }
  }
}
</script>
