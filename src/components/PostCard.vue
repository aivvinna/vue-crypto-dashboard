<template>
  <div @click.stop="openModal">
    <div class="post-card">
      <div class="card">
        <div class="card-content">
          <div class="columns">
            <div class="column is-1">
              <span
                class="icon is-small vote-button"
                :class="{'has-text-success': isUpvoted}"
                @click.stop.prevent="handleUpvote">
                <i class="fas fa-chevron-up"></i>
              </span>
              <br>
              <span class="icon is-small">
                {{post.upvotes.length - post.downvotes.length}}
              </span>
              <br>
              <span
                class="icon is-small vote-button"
                :class="{'has-text-danger': isDownvoted}"
                @click.stop.prevent="handleDownvote">
                <i class="fas fa-chevron-down"></i>
              </span>
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
    computed: {
    ...mapGetters('user', ['user']),
    isUpvoted() {
      return this.post.upvotes.some(user => user.id === this.user.id)
    },
    isDownvoted() {
      return this.post.downvotes.some(user => user.id === this.user.id)
    }
  },
  methods: {
    openModal() {
      this.$router.push({name: 'post', params: { id: this.post.id}})
    },
    goToUserProfile() {
      this.$router.push({name: 'user', params: {username: this.post.author.username}})
    },
    handleUpvote() {
      if (this.isUpvoted) {
        this.handleRemoveUpvote()
      } else {
        this.handleUpvotePost()
      }
    },
    handleDownvote() {
      if (this.isDownvoted) {
        this.handleRemoveDownvote()
      } else {
        this.handleDownvotePost()
      }
    },
    handleUpvotePost() {
      this.$store.dispatch("posts/upvotePost", {
        id: this.post.id
      })
    },
    handleRemoveUpvote() {
      this.$store.dispatch("posts/removeUpvote", {
        id: this.post.id
      })
    },
    handleDownvotePost() {
      this.$store.dispatch("posts/downvotePost", {
        id: this.post.id
      })
    },
    handleRemoveDownvote() {
      this.$store.dispatch("posts/removeDownvote", {
        id: this.post.id
      })
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

.vote-button {
  cursor: pointer;
  &:hover {
    color: gray;
  }
}
</style>
