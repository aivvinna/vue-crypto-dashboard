<template>
  <div>
    <div class="title">
      Search Result for "{{$route.params.searchTerm}}"
    </div>
    <div class="columns">
      <div class="column">
        <div v-if="$apollo.queries.users.loading">
          loading users...
        </div>
        <template v-else>
          <div class="columns is-multiline">
            <div v-for="user in users" :key="user.id" class="column is-half">
              <UserCard :user="user"/>
            </div>
          </div>
        </template>
      </div>
      <div class="column">
        <div v-if="$apollo.queries.posts.loading">
          loading posts...
        </div>
        <template v-else>
          <div v-for="post in posts" :key="post.id">
            <PostCard :post="post"/>
          </div>
        </template>
      </div>
    </div>
    
  </div>
</template>

<script>
import { GET_POSTS_SEARCH, GET_USERS_SEARCH } from '@/graphql/queries'
import PostCard from '@/components/PostCard.vue'
import UserCard from '@/components/UserCard.vue'

export default {
  name: 'SearchResult',
  components: {
    PostCard,
    UserCard
  },
  data() {
    return {
      posts: []
    }
  },
  apollo: {
    posts: {
      query: GET_POSTS_SEARCH,
      variables() {
        return {
          first: 15,
          skip: 0,
          query: this.$route.params.searchTerm
        }
      }
    },
    users: {
      query: GET_USERS_SEARCH,
      variables() {
        return {
          first: 15,
          skip: 0,
          query: this.$route.params.searchTerm
        }
      }
    }
  }
}
</script>
