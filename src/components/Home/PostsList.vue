<template>
  <!-- <div> -->
    <!-- <v-dialog v-model="loading" persistent fullscreen>
      <v-container fill-height>
        <v-layout row justify-center align-center>
          <v-progress-circular indeterminate :size="70" :width="7" color="secondary"></v-progress-circular>
        </v-layout>
      </v-container>
    </v-dialog> -->
    <v-container v-if="!loading" pa-0 ma-0 fluid>
      <v-layout column justify-center>
        <div v-for="(post, index) in posts" :key="post.id">
          <v-flex ma-1>
            <PostModal :post="post"/>
            <v-divider v-if="index + 1 < posts.length"></v-divider>
          </v-flex>
        </div>
      </v-layout>
    </v-container>
  <!-- </div> -->
</template>

<script>
import { mapGetters } from 'vuex';
import PostModal from '../PostModal.vue'

export default {
  name: 'PostsList',
  components: {
    PostModal
  },
  created() {
    this.handleGetPosts()
  },
  computed: {
    ...mapGetters(['loading', 'posts'])
  },
  methods: {
    handleGetPosts() {
      this.$store.dispatch('getPosts')
    },
  }
}
</script>
