<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs3>
        <v-container fluid pa-0 ma-0>
          <v-layout row>
            <div>
              left
            </div>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex xs6>
        <v-container fluid pa-0 ma-0>
          <v-layout row>
            <div v-if="!loading">
              {{data.user.username}}'s Posts
              <div v-for="(post, index) in data.user.posts" :key="post.id">
                <v-flex ma-1>
                  <PostModal :post="post"/>
                  <v-divider v-if="index + 1 < data.user.posts.length"></v-divider>
                </v-flex>
              </div>
            </div>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex xs3>
        <v-container fluid pa-0 ma-0>
          <v-layout row>
            <div>
              right
            </div>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { defaultClient as apolloClient } from '@/main';
import { GET_USER } from '@/graphql/queries';

import PostModal from '@/components/PostModal.vue'

export default {
  components: {
    PostModal
  },
  created() {
    this.getUser()
  },
  data() {
    return {
      data: {},
      loading: false
    }
  },
  methods: {
    async getUser() {
      this.loading = true;
      try {
        const { data } = await apolloClient.query({
          query: GET_USER,
          variables: {
            data: {
              username: this.$route.params.username
            }
          }
        })
        this.data = data
        this.loading = false;
        console.log(this.data)
      } catch(err) {
        console.error(err)
      }
    }
  }
}
</script>
