<template>
  <div>
    <PostCard @click.native="dialog = true" :post="post"/>

    <v-dialog dark max-width="600" v-model="dialog">
      <v-card>
        <v-layout row wrap>
          <v-flex xs12 sm6 offset-sm3>
            <h1 class="primary--text">{{post.content}}</h1>
            <h2>{{post.author.username}} - {{post.category}}</h2>
          </v-flex>
        </v-layout>
      </v-card>

    </v-dialog>
  </div>  

</template>

<script>
import PostCard from './PostCard.vue'

export default {
  name: "PostModal",
  components: {
    PostCard
  },
  props: ['post'],
  data() {
    return {
      dialog: false,
    }
  }
}
</script>
