<template>
    <v-container v-if="!loading" pa-0 ma-0 fluid>
      <v-layout column justify-center>
        <div v-for="(post, index) in posts" :key="post.id">
          <v-flex ma-1>
              <PostCard :post="post" />
            <v-divider v-if="index + 1 < posts.length"></v-divider>
          </v-flex>
        </div>
      </v-layout>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import PostCard from '@/components/PostCard.vue'

export default {
  name: 'PostsList',
  components: {
    PostCard
  },
  created() {
    this.handleGetPosts()
  },
  computed: {
    ...mapGetters(['loading']),
    ...mapGetters('posts', ['posts'])
  },
  methods: {
    handleGetPosts() {
      this.$store.dispatch('posts/getPosts')
    },
  }
}
</script>
