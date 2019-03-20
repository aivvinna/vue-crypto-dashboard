<template>
  <div @click.stop="openModal">
    <div class="post-card">
      <div class="card">
        <div class="card-content">
          <div class="columns">
            <div class="column is-1">
              <span class="icon is-small"><i class="fas fa-chevron-up"></i></span>
              <br>
              <span class="icon is-small"><i class="fas fa-chevron-down"></i></span>
            </div>
            <div class="column is-11">
              <div class="media">
                <div class="media-content">
                  <p class="title is-6">
                    <a @click.stop.prevent="goToUserProfile">
                      {{post.author.displayName ? post.author.displayName : post.author.username}} {{`@${post.author.username}`}}
                    </a>
                  </p>
                  <p class="subtitle is-6">
                    <template v-if="post.category.length !== 0">
                      <span
                        class="grey--text" v-for="(category, i) in post.category" :key="category">
                        {{post.category[i]}}|
                      </span><br>
                    </template>
                  </p>
                </div>
              </div>

              <div class="content">
                <span>{{post.content}}</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PostCard',
  props: ['post'],
  methods: {
    openModal() {
      this.$router.push({name: 'post', params: { id: this.post.id}})
    },
    goToUserProfile() {
      this.$router.push({name: 'user', params: {username: this.post.author.username}})
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  color: black;
  &:hover {
    color: #0000EE;
    text-decoration: underline;
  }
}

.post-card {
  margin-bottom: 10px;
}

.column {
  margin: 0px;
  padding: 0px;
}
</style>
