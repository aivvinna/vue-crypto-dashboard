<template>
  <div>
    <PostCard @click.native="dialog = true" :post="post"/>

    <v-dialog dark max-width="600" v-model="dialog">
      <v-card>
        <v-layout row wrap>
          <v-flex xs12 sm6 offset-sm3>
            <h1 class="primary--text">{{post.title}}</h1>
            <h2>{{post.author.username}} - {{post.body}}</h2>
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
  },
  mounted() {
    // console.log('postalmodal mounted')
  },
  computed: {
    showPostDialog: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>
