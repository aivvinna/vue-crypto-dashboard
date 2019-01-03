<template>
  <v-container>
    <h1>HOME</h1>
    <!-- <div v-if="$apollo.loading">Loading...</div> -->
    <h2 v-for="post in posts" :key="post.id">{{post.title}} {{post.body}}</h2>
  </v-container>
</template>

<script>
export default {
  components: {
    
  },
  data() {
    return {

    }
  },
  computed: {
    posts() {
      return this.$store.getters.posts
    }
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
