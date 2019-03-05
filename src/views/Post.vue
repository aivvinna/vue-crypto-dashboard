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
import postMixin from '@/mixins/postMixin'

export default {
  name: "Post",
  mixins: [postMixin]
}
</script>
