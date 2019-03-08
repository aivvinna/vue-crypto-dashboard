<template>
  <div class="modal is-active">
    <div class="modal-background" @click.self.stop="closeModal"></div>
    <div class="modal-content">
      <template v-if="post">
        <div class="card">
          <h1>{{post.content}}</h1>
          <h2>{{post.author.username}} - {{post.category}}</h2>
        </div>
      </template>
    </div>
    <button class="modal-close is-large" aria-label="close"></button>
  </div>
</template>

<script>
import postMixin from '@/mixins/postMixin'

export default {
  name: "PostModal",
  mixins: [postMixin],
  methods: {
    closeModal() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  }
}
</script>

<style>

</style>
