<template>
  <div class="columns">
    <div class="column is-3">
      Left
    </div>
    <div class="column is-6">
      <div class="user-profile" v-if="data.user">
        <div class="level">
          <div class="level-item has-text-centered">
            <figure class="image is-64x64">
              <img src="https://bulma.io/images/placeholders/128x128.png">
            </figure>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <span class="title">{{data.user.displayName !== "" ? data.user.displayName : data.user.username}}</span>
              <br>
              <span class="subtitle">@{{data.user.username}}</span>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div v-if="data.user.username !== me.username">
              <button class="button">
                <span>Follow</span>
              </button>
              <br>
              <button class="button">Message</button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!loading">
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
  computed: {
    me() {
      return this.$store.getters['user/user']
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

<style lang="scss">
.user-profile {
  padding: 20px;
  margin-bottom: 20px;
}
</style>
