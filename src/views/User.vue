<template>
  <div class="columns">
    <div class="column is-3">
      Left
    </div>
    <div class="column is-6">
      <div v-if="!loading">
        {{data.user.username}}'s Posts
        <div v-for="post in data.user.posts" :key="post.id">
          <PostCard :post="post"/>
        </div>
      </div>
    </div>
    <div class="column is-3">
      Right
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { defaultClient as apolloClient } from '@/main';
import { GET_USER } from '@/graphql/queries';

import PostCard from '@/components/PostCard.vue'

export default {
  components: {
    PostCard
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
