<template>
  <div>
    <v-dialog v-model="loading" persistent fullscreen>
      <v-container fill-height>
        <v-layout row justify-center align-center>
          <v-progress-circular indeterminate :size="70" :width="7" color="secondary"></v-progress-circular>
        </v-layout>
      </v-container>
    </v-dialog>
    <div v-if="!loading">
      <h2 v-for="post in posts" :key="post.id">{{post.title}} {{post.body}}</h2>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PostsList',
  components: {
    
  },
  data() {
    return {
    }
  },
  mounted() {
    console.log('Posts section mounted')
  },
  computed: {
    ...mapGetters(['loading', 'posts'])
  },
  created() {
    this.handleGetPosts()
  },
  methods: {
    handleGetPosts() {
      this.$store.dispatch('getPosts')
    },
  }
}
</script>
