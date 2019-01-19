<template>
  <v-container fluid>
    <h1>HOME</h1>
    <v-layout row>
      <v-container fluid pa-0 ma-0>
        <v-layout row>
          Hi
        </v-layout>
      </v-container>
      <v-container fluid pa-0 ma-0>
        <v-layout row>
          <CryptoGrid/>
        </v-layout>
      </v-container>
      <v-container fluid pa-0 ma-0>
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

import CryptoGrid from '../components/Home/CryptoGrid.vue'

export default {
  components: {
    CryptoGrid,
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
    },
  }
}
</script>
