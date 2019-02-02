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
      <!-- <h2 v-for="post in posts" :key="post.id">{{post.title}} {{post.body}}</h2> -->
      <v-list two-line>
        <div v-for="(post, index) in posts" :key="post.id">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img v-if="post.author.avatar" :src="post.author.avatar" alt="">
              <v-icon v-else>
                person
              </v-icon>
            </v-list-tile-avatar>
            
            <v-list-tile-content>
              <v-list-tile-title>{{post.title}}</v-list-tile-title>
              <v-list-tile-sub-title>{{post.author.username}} - {{post.body}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider v-if="index + 1 < posts.length"></v-divider>
        </div>
      </v-list>
    </template>
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
