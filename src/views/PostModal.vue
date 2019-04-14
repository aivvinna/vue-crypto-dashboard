<template>
  <div class="modal is-active">
    <div class="modal-background" @click.self.stop="closeModal"></div>
    <div class="modal-content">
      <div class="box">
        <template v-if="post">
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
                  <p>
                    <a @click.stop.prevent="goToUserProfile">
                      <strong>{{post.author.displayName ? post.author.displayName : post.author.username}}</strong>
                      <small> {{`@${post.author.username}`}}</small> 
                    </a>
                    <small> {{new Date(post.createdAt).toLocaleString()}}</small>
                  </p>
                  <p class="is-italic" v-if="post.category.length !== 0">
                    <span
                      v-for="(category, i) in post.category" :key="category">
                      {{i !== 0 ? "|" : "" }}{{post.category[i]}}
                    </span>
                  </p>
                  <p>{{post.content}}</p>
                </div>
              </div>
            </div>
          </div>
          <textarea class="textarea" placeholder="e.g. Hello world" :rows="textBoxSize"
            @focus="textBoxFocused = true"
            @blur="textBoxFocused = false"></textarea>
        </template>
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close"></button>
  </div>
</template>

<script>
import postMixin from '@/mixins/postMixin'

export default {
  name: "PostModal",
  mixins: [postMixin],
  data() {
    return {
      textBoxFocused: false
    }
  },
  created() {
    console.log(this.$route.params.id)
  },
  computed: {
    textBoxSize() {
      if (this.textBoxFocused) {
        return 4
      } else {
        return 1
      }
    },
  },
  methods: {
    closeModal() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
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

.vote-button {
  cursor: pointer;
  &:hover {
    color: gray;
  }
}
</style>
