<template>
  <div class="modal is-active">
    <div class="modal-background" @click.self.stop="closeModal"></div>
    <div class="modal-content">
      <div class="box">
        <template v-if="post">
          <article class="media">
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>{{post.author.displayName}}</strong> <small>@{{post.author.username}}</small>
                  <br>
                  {{post.content}}
                  <br>
                  {{post.category}}
                </p>
              </div>
              <nav class="level is-mobile">
                <div class="level-left">
                  <a class="level-item">
                    <span class="icon is-small"><i class="fas fa-chevron-up"></i></span>
                  </a>
                  <span class="level-item">
                    {{post.upvotes.length}}
                  </span>
                  <a class="level-item">
                    <span class="icon is-small"><i class="fas fa-chevron-down"></i></span>
                  </a>
                  <span class="level-item">
                    {{post.downvotes.length}}
                  </span>
                </div>
              </nav>
            </div>
          </article>
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
  computed: {
    textBoxSize() {
      if (this.textBoxFocused) {
        return 4
      } else {
        return 1
      }
    }
  },
  methods: {
    closeModal() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  }
}
</script>

<style>

</style>
