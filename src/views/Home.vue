<template>
  <v-container>
    <h1>HOME</h1>
    <v-layout row>
      <v-container>
        <v-layout row>
          Hi
        </v-layout>
      </v-container>
      <v-container>
        <v-layout row>
          Second
        </v-layout>
      </v-container>
      <v-container>
        <v-layout row>
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
        </v-layout>
      </v-container>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  components: {
    
  },
  data() {
    return {

    }
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
    }
  }
}
</script>
