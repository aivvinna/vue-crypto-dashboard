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
  data() {
    return {
      canGetMorePosts: true
    }
  },
  created() {
    if (this.posts.length === 0) {
      this.handleGetPosts()
    }
    this.scroll()
  },
  computed: {
    ...mapGetters(['loading']),
    ...mapGetters('posts', ['posts']),
    postsLoaded() {
      return this.posts.length
    }
  },
  watch: {
    postsLoaded: function() {
      this.canGetMorePosts = true
    }
  },
  methods: {
    handleGetPosts() {
      this.$store.dispatch('posts/getPosts', {first: 15, skip: this.postsLoaded})
    },
    scroll() {
      window.onscroll = () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight + 300 >= document.documentElement.offsetHeight;
        if (bottomOfWindow && this.canGetMorePosts) {
          this.handleGetPosts()
          this.canGetMorePosts = false
        }
      }
    }
  }
}
</script>
