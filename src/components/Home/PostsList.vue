<template>
  <div>
    <v-dialog v-model="loading" persistent fullscreen>
      <v-container fill-height>
        <v-layout row justify-center align-center>
          <v-progress-circular indeterminate :size="70" :width="7" color="secondary"></v-progress-circular>
        </v-layout>
      </v-container>
    </v-dialog>
    <template v-if="!loading">
      <v-list two-line>
        <div v-for="(post, index) in posts" :key="post.id">
          <PostCard :post="post"/>
          <v-divider v-if="index + 1 < posts.length"></v-divider>
        </div>
      </v-list>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PostCard from '../PostCard.vue'

export default {
  name: 'PostsList',
  components: {
    PostCard
  },
  data() {
    return {
    }
  },
  mounted() {
    console.log('Posts section mounted')
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
