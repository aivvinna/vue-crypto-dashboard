<template>
  <div class="modal is-active">
    <div class="modal-background" @click.self.stop="closeModal"></div>
    <div class="modal-content">
      <div class="box">
        <template v-if="post">
          <div class="post-modal-post">
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
          </div>

          <div class="reply-container">
            <form @submit.prevent="handleCreatePostWithParent">
              <div class="field">
                <label v-show="textBoxFocused || replyContentLength" class="label">
                  Replying to @{{post.author.username}}'s post
                </label>
                <div class="control">
                  <textarea
                    class="textarea"
                    :placeholder="replyTextPlaceholder"
                    v-model="replyContent"
                    @focus="textBoxFocused = true"
                    @blur="textBoxFocused = false"
                    :rows="textBoxSize"></textarea>
                </div>
                <div class="level">
                  <p v-if="replyContentLength > 250" class="level-left help is-danger">
                    Content must have less than or equal to 250 characters
                  </p>
                  <p v-else class="level-left help is-danger"></p>
                  <p class="level-right">
                    {{replyContent.length}}
                  </p>
                </div>
              </div>
              <div v-show="textBoxFocused || replyContentLength" class="field is-grouped is-grouped-right">
                <div class="control">
                  <button class="button is-dark"
                    type="submit"
                    :disabled="replyContent.length === 0">Submit</button>
                </div>
              </div>
            </form>
          </div>
        </template>
        <template v-if="post">
          <div v-for="post in post.posts" :key="post.id">
            <PostCard :post="post"/>
          </div>
        </template>
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close"></button>
  </div>
</template>

<script>
import postMixin from '@/mixins/postMixin'
import PostCard from '@/components/PostCard.vue'

export default {
  name: "PostModal",
  components: {
    PostCard
  },
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
      if (this.textBoxFocused || this.replyContent.length > 0) {
        return 3
      } else {
        return 1
      }
    },
    replyTextPlaceholder() {
      return `Reply to @${this.post.author.username}'s post`
    },
    replyContentLength() {
      return this.replyContent.length
    }
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

.post-modal-post {
  margin: 20px;
}

.box {
  padding: 0px;
  padding-bottom: 10px;
}

.reply-container {
  margin: 20px;
}
</style>
