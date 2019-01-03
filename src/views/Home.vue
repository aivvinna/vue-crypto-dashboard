<template>
  <v-container>
    <h1>HOME</h1>
    <div v-if="$apollo.loading">Loading...</div>
    <h2 v-else v-for="post in posts" :key="post.id">{{post.title}} {{post.body}}</h2>
  </v-container>
</template>

<script>
import gql from 'graphql-tag'

  export default {
    components: {
      
    },
    data() {
      return {
        posts: []
      }
    },
    apollo: {
      posts: {
        query: gql`query {
          posts {
            id
            title
            body
          }
        }`,
        result() {
          console.log(this.$apollo.store)
        }
      }
    }
  }
</script>
