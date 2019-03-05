<template>
  <div>
    <v-card>
      <v-layout row wrap>
        <v-flex xs12 sm6 offset-sm3>
          <template v-if="post">
            <h1 class="primary--text">{{post.content}}</h1>
            <h2>{{post.author.username}} - {{post.category}}</h2>
          </template>
        </v-flex>
      </v-layout>
    </v-card>
  </div>  
</template>

<script>
import { defaultClient as apolloClient } from '@/main'
import { GET_POST } from '@/graphql/queries'

export default {
  name: "Post",
  data() {
    return {
      post: null
    }
  },
  async created() {
    try {
      const { data } = await apolloClient.query({
        query: GET_POST,
        variables: {
          id: this.$route.params.id
        }
      })
      this.post = data.post
    } catch(err) {
      console.error(err)
    }
  }
}
</script>
