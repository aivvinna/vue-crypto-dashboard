<template>
  <div v-if="!loading">
    <div v-for="post in posts" :key="post.id">
      <PostCard :post="post" />
    </div>
  </div>
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
